import type { Request, Response, NextFunction } from "express";
import rateLimit, { type Store, type IncrementResponse, type Options } from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { logSecurityEvent } from "../services/logger.js";

export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  const fwdHeader = req.headers["forwarded"];
  if (typeof fwdHeader === "string") {
    const match = fwdHeader.match(/for="?([^;,\s]+)"?/i);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return req.ip || req.socket?.remoteAddress || "127.0.0.1";
}

/**
 * IP Client Record stored inside the robust memory store.
 */
export interface IpTrackRecord {
  ip: string;
  currentHits: number;
  lifetimeHits: number;
  windowStart: number;
  resetTime: Date;
  isThrottled: boolean;
  lastSeen: string;
}

/**
 * Robust in-memory rate limit store for IP address tracking.
 * Features:
 * - Accurate per-IP tracking with hit counters & window resets
 * - Lifetime hit statistics and throttle detection
 * - Automatic background garbage collection for expired entries
 * - Thread-safe, non-blocking synchronous/asynchronous execution
 */
export class RobustIpRateLimitStore implements Store {
  private windowMs: number = 60 * 1000;
  private maxAllowed: number = 60;
  private clients = new Map<string, IpTrackRecord>();
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(windowMs?: number, maxAllowed?: number) {
    if (windowMs) this.windowMs = windowMs;
    if (maxAllowed) this.maxAllowed = maxAllowed;

    // Self-cleaning garbage collector every 60 seconds
    this.cleanupTimer = setInterval(() => {
      this.clearExpired();
    }, 60 * 1000);

    // Ensure timer doesn't prevent Node process termination
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  init(options: Options): void {
    this.windowMs = options.windowMs;
    if (typeof options.max === "number") {
      this.maxAllowed = options.max;
    }
  }

  async increment(key: string): Promise<IncrementResponse> {
    const now = Date.now();
    let record = this.clients.get(key);

    if (!record || now >= record.resetTime.getTime()) {
      // Initialize or reset window
      record = {
        ip: key,
        currentHits: 1,
        lifetimeHits: (record?.lifetimeHits || 0) + 1,
        windowStart: now,
        resetTime: new Date(now + this.windowMs),
        isThrottled: false,
        lastSeen: new Date().toISOString(),
      };
      this.clients.set(key, record);
    } else {
      record.currentHits += 1;
      record.lifetimeHits += 1;
      record.lastSeen = new Date().toISOString();
      if (record.currentHits > this.maxAllowed) {
        record.isThrottled = true;
      }
    }

    return {
      totalHits: record.currentHits,
      resetTime: record.resetTime,
    };
  }

  async decrement(key: string): Promise<void> {
    const record = this.clients.get(key);
    if (record && record.currentHits > 0) {
      record.currentHits -= 1;
      if (record.currentHits <= this.maxAllowed) {
        record.isThrottled = false;
      }
    }
  }

  async resetKey(key: string): Promise<void> {
    this.clients.delete(key);
  }

  async resetAll(): Promise<void> {
    this.clients.clear();
  }

  async get(key: string) {
    const record = this.clients.get(key);
    if (!record) return undefined;
    return {
      totalHits: record.currentHits,
      resetTime: record.resetTime,
    };
  }

  private clearExpired(): void {
    const now = Date.now();
    for (const [ip, record] of this.clients.entries()) {
      // If the window has expired and hasn't been active for 2 full windows, purge it
      if (now > record.resetTime.getTime() + this.windowMs) {
        this.clients.delete(ip);
      }
    }
  }

  getMetrics() {
    const now = Date.now();
    let activeTracked = 0;
    let throttledCount = 0;
    const recentClients: Array<{ ip: string; hits: number; throttled: boolean; lastSeen: string }> = [];

    for (const [ip, record] of this.clients.entries()) {
      if (now <= record.resetTime.getTime() + this.windowMs) {
        activeTracked++;
        if (record.isThrottled) throttledCount++;
        if (recentClients.length < 15) {
          recentClients.push({
            ip,
            hits: record.currentHits,
            throttled: record.isThrottled,
            lastSeen: record.lastSeen,
          });
        }
      }
    }

    return {
      totalTrackedIps: activeTracked,
      throttledIpsCount: throttledCount,
      windowMs: this.windowMs,
      maxAllowed: this.maxAllowed,
      recentClients,
    };
  }

  shutdown(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
}

// Instantiate Robust In-Memory Stores
export const apiIpStore = new RobustIpRateLimitStore(60 * 1000, 60);
export const contactIpStore = new RobustIpRateLimitStore(15 * 60 * 1000, 5);

export function getRateLimiterMetrics() {
  return {
    apiLimiter: apiIpStore.getMetrics(),
    contactLimiter: contactIpStore.getMetrics(),
  };
}

/**
 * Middleware that sets custom rate limit headers ('X-RateLimit-Limit', 'X-RateLimit-Remaining')
 * to ensure all clients have explicit visibility into their request quotas.
 */
function attachCustomRateLimitHeaders(req: Request, res: Response, next: NextFunction) {
  const ip = getClientIp(req);
  apiIpStore.get(ip).then((data) => {
    const limit = 60;
    const hits = data?.totalHits || 0;
    const remaining = Math.max(0, limit - hits);
    res.setHeader("X-RateLimit-Limit", String(limit));
    res.setHeader("X-RateLimit-Remaining", String(remaining));
    if (data?.resetTime) {
      const resetSeconds = Math.ceil(data.resetTime.getTime() / 1000);
      res.setHeader("X-RateLimit-Reset", String(resetSeconds));
    }
  }).catch(() => {
    // Non-blocking fallback
    res.setHeader("X-RateLimit-Limit", "60");
  }).finally(() => {
    next();
  });
}

// Enhanced General API rate limiter (60 req/min) using Robust IP Memory Store
const baseApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true, // Draft-6 / Draft-7 RateLimit-* headers
  legacyHeaders: false,
  store: apiIpStore,
  keyGenerator: (req) => getClientIp(req),
  skip: (req) => {
    // Never rate-limit health and keep-alive endpoints
    return req.path.startsWith("/health") || req.path === "/health" || req.path === "/healthz";
  },
  validate: {
    xForwardedForHeader: false,
    forwardedHeader: false,
    trustProxy: false,
  },
  handler: (req: Request, res: Response) => {
    const ip = getClientIp(req);
    const resetTime = new Date(Date.now() + 60 * 1000);
    const retryAfter = 60;

    logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, `API rate limit threshold exceeded (60 req/min) on ${req.originalUrl}`, "warning");

    // Add custom response headers explicitly informing users they are being throttled
    res.setHeader("X-RateLimit-Limit", "60");
    res.setHeader("X-RateLimit-Remaining", "0");
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(resetTime.getTime() / 1000)));
    res.setHeader("Retry-After", String(retryAfter));

    res.status(429).json({
      error: "Too many requests. Please slow down.",
      status: 429,
      clientIp: ip,
      rateLimit: {
        limit: 60,
        remaining: 0,
        retryAfterSeconds: retryAfter,
      },
      message: "You have exceeded the request rate limit. Please wait before retrying.",
    });
  },
});

// Composed API limiter: attaches headers & applies robust rate limit
export const apiLimiter = [attachCustomRateLimitHeaders, baseApiLimiter];

// Contact form submission rate limiter (5 submissions per 15 minutes) using Robust IP Memory Store
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: contactIpStore,
  keyGenerator: (req) => getClientIp(req),
  validate: {
    xForwardedForHeader: false,
    forwardedHeader: false,
    trustProxy: false,
  },
  handler: (req: Request, res: Response) => {
    const ip = getClientIp(req);
    const retryAfter = 15 * 60;

    logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, "Contact form spam threshold reached (5 submissions in 15min)", "error");

    // Custom response headers informing user of throttling
    res.setHeader("X-RateLimit-Limit", "5");
    res.setHeader("X-RateLimit-Remaining", "0");
    res.setHeader("Retry-After", String(retryAfter));

    res.status(429).json({
      error: "Too many message submissions from this IP address. To prevent spam, please wait 15 minutes before sending another message.",
      status: 429,
      clientIp: ip,
      rateLimit: {
        limit: 5,
        remaining: 0,
        retryAfterSeconds: retryAfter,
      },
    });
  },
});

export const helmetMiddleware = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  frameguard: false,
});

export const corsMiddleware = cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-cron-secret"],
});
