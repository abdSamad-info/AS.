import { Router } from "express";
import { authenticateCron } from "../middleware/auth.js";
import { getClientIp } from "../middleware/security.js";
import { getDbPool } from "../services/db.js";
import { imageCache, cacheHitCount, cacheMissCount } from "../services/cache.js";
import { CRON_SECRET } from "../config/env.js";

const router = Router();

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

let keepAlivePingCount = 0;
let lastPingAt: string | null = null;
let lastPingIp: string | null = null;

/**
 * 1. Cloud Scheduler Keep-Alive Endpoint
 * GET /api/health/ping or /api/health/keep-alive
 * 
 * Optimized for recurring Cloud Scheduler pings every 2, 5, or 10 minutes.
 * Keeps the server instance active and warm, prevents cold starts, and verifies responsiveness.
 */
router.get(["/health/ping", "/health/keep-alive", "/healthz"], authenticateCron, (req, res) => {
  const clientIp = getClientIp(req);
  keepAlivePingCount++;
  lastPingAt = new Date().toISOString();
  lastPingIp = clientIp;

  const mem = process.memoryUsage();

  return res.status(200).json({
    status: "ok",
    healthy: true,
    message: "Server is alive and responding to Cloud Scheduler.",
    scheduler: {
      isKeepAlive: true,
      pingCount: keepAlivePingCount,
      lastPingAt,
      recommendedInterval: "Every 2-5 minutes or 5-10 minutes",
      isSecurityProtected: Boolean(CRON_SECRET),
    },
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      uptimeHuman: formatUptime(process.uptime()),
      timestamp: lastPingAt,
      nodeVersion: process.version,
      memoryHeapUsedMb: (mem.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    },
  });
});

/**
 * 2. Full System Health & Diagnostics Endpoint
 * GET /api/health
 */
router.get("/health", authenticateCron, async (req, res) => {
  const pool = getDbPool();
  let dbStatus = "not_configured";
  let dbLatencyMs: number | null = null;

  if (pool) {
    const start = Date.now();
    try {
      await pool.query("SELECT 1");
      dbStatus = "connected";
      dbLatencyMs = Date.now() - start;
    } catch (err: any) {
      dbStatus = "error: " + err.message;
    }
  }

  const mem = process.memoryUsage();
  const totalRequests = cacheHitCount + cacheMissCount;
  const hitRatio = totalRequests > 0 ? ((cacheHitCount / totalRequests) * 100).toFixed(1) + "%" : "100%";

  return res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(process.uptime()),
      formatted: formatUptime(process.uptime()),
    },
    cloudScheduler: {
      compatible: true,
      pingCount: keepAlivePingCount,
      lastPingAt,
      lastPingIp,
      authMode: CRON_SECRET ? "Strict (CRON_SECRET enforced)" : "Permissive (CRON_SECRET recommended for production)",
    },
    services: {
      database: {
        type: pool ? "PostgreSQL" : "In-Memory Store",
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
      imageBufferCache: {
        totalCachedAssets: imageCache.size,
        hits: cacheHitCount,
        misses: cacheMissCount,
        hitRatio,
      },
      smtpEmail: {
        configured: Boolean(process.env.EMAIL_USER && (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD)),
        senderUser: process.env.EMAIL_USER || "Not configured",
      },
      resendEmail: {
        configured: Boolean(process.env.RESEND_API_KEY),
      },
    },
    memory: {
      rss: (mem.rss / 1024 / 1024).toFixed(2) + " MB",
      heapTotal: (mem.heapTotal / 1024 / 1024).toFixed(2) + " MB",
      heapUsed: (mem.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    },
  });
});

export default router;
