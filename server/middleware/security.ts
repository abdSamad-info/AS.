import type { Request, Response } from "express";
import rateLimit from "express-rate-limit";
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

// General API rate limiter (60 req/min), skipping health/cron endpoints
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getClientIp(req),
  skip: (req) => {
    // Never rate-limit health and Cloud Scheduler keep-alive requests
    return req.path.startsWith("/health") || req.path === "/health" || req.path === "/healthz";
  },
  validate: {
    xForwardedForHeader: false,
    forwardedHeader: false,
    trustProxy: false,
  },
  handler: (req: Request, res: Response) => {
    const ip = getClientIp(req);
    logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, `General API rate limit reached on ${req.originalUrl}`, "warning");
    res.status(429).json({ error: "Too many requests. Please slow down." });
  },
});

// Contact form submission rate limiter (5 submissions per 15 minutes)
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getClientIp(req),
  validate: {
    xForwardedForHeader: false,
    forwardedHeader: false,
    trustProxy: false,
  },
  handler: (req: Request, res: Response) => {
    const ip = getClientIp(req);
    logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, "Contact form spam threshold reached (5 submissions in 15min)", "error");
    res.status(429).json({
      error: "Too many message submissions from this IP address. To prevent spam, please wait 15 minutes before sending another message.",
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
