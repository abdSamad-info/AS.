import { Router } from "express";
import { authenticateCron } from "../middleware/auth.js";
import { getClientIp } from "../middleware/security.js";
import { checkDatabaseHealthLive, getDatabaseStatus } from "../services/db.js";
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

let cronCheckCount = 0;
let lastCronCheckAt: string | null = null;

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
 * 2. Dedicated Protected Database Health Check Endpoint
 * GET /api/health/db or /api/health/db-check
 * 
 * Verifies live database connectivity, round-trip execution latency, and table schemas.
 * Protected via authenticateCron (x-cron-secret header, Bearer token, or ?secret= query).
 * Ideal target for 15-minute or 5-minute health monitoring cron jobs.
 */
router.get(["/health/db", "/health/db-check", "/db/health"], authenticateCron, async (req, res) => {
  const clientIp = getClientIp(req);
  const startTime = Date.now();

  // Perform live query check against the database
  const liveDbCheck = await checkDatabaseHealthLive();
  const latencyMs = liveDbCheck.latencyMs >= 0 ? liveDbCheck.latencyMs : Date.now() - startTime;
  const isHealthy = liveDbCheck.healthy;

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "degraded",
    service: "database_health_check",
    healthy: isHealthy,
    timestamp: new Date().toISOString(),
    caller: {
      ip: clientIp,
    },
    database: {
      type: liveDbCheck.type,
      status: liveDbCheck.status,
      connected: liveDbCheck.connected,
      healthy: liveDbCheck.healthy,
      latencyMs,
      fallbackMode: liveDbCheck.fallbackMode || null,
      error: liveDbCheck.error || null,
      verificationQuery: "SELECT 1 AS health_check",
    },
    protection: {
      protectedUrl: "/api/health/db",
      authMethod: CRON_SECRET ? "Protected with CRON_SECRET" : "Permissive (unconfigured secret)",
      isSecured: Boolean(CRON_SECRET),
      scheduleInterval: "15 minutes (*/15 * * * *)",
    },
  });
});

/**
 * 3. Dedicated Secure Health Check for Cron (every 15 min or 1 hour)
 * GET /api/health/cron or /api/cron/health or /api/health
 * 
 * Secure endpoint: Only accessible with valid secret (via 'x-cron-secret' header,
 * 'Authorization: Bearer <secret>', or '?secret=<secret>' query param).
 * Checks:
 * - Live Database health (active query test with latency in ms)
 * - Memory usage & System uptime
 * - Active services (Resend, Cache)
 * - Designed for easy invocation via curl and cloud cron jobs
 */
router.get(["/health/cron", "/cron/health", "/health"], authenticateCron, async (req, res) => {
  const clientIp = getClientIp(req);
  cronCheckCount++;
  lastCronCheckAt = new Date().toISOString();

  // Perform live query check against the database
  const liveDbCheck = await checkDatabaseHealthLive();

  const mem = process.memoryUsage();
  const totalRequests = cacheHitCount + cacheMissCount;
  const hitRatio = totalRequests > 0 ? ((cacheHitCount / totalRequests) * 100).toFixed(1) + "%" : "100%";

  const overallStatus = liveDbCheck.healthy ? "healthy" : "degraded";

  return res.status(200).json({
    status: overallStatus,
    timestamp: lastCronCheckAt,
    cronCheck: {
      checkCount: cronCheckCount,
      lastCheckedAt: lastCronCheckAt,
      callerIp: clientIp,
      recommendedSchedule: "Every 15 minutes (*/15 * * * *) or 1 hour (0 * * * *)",
      authMethod: CRON_SECRET ? "Protected with CRON_SECRET" : "Permissive (unconfigured secret)",
      curlUsage: "curl -s -H 'x-cron-secret: <CRON_SECRET>' https://abdsamad.online/api/health/cron",
    },
    database: {
      type: liveDbCheck.type,
      status: liveDbCheck.status,
      connected: liveDbCheck.connected,
      healthy: liveDbCheck.healthy,
      latencyMs: liveDbCheck.latencyMs,
      fallbackMode: liveDbCheck.fallbackMode || null,
      error: liveDbCheck.error || null,
    },
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      uptimeFormatted: formatUptime(process.uptime()),
      memory: {
        rss: (mem.rss / 1024 / 1024).toFixed(2) + " MB",
        heapTotal: (mem.heapTotal / 1024 / 1024).toFixed(2) + " MB",
        heapUsed: (mem.heapUsed / 1024 / 1024).toFixed(2) + " MB",
      },
    },
    services: {
      resendEmail: {
        configured: Boolean(process.env.RESEND_API_KEY),
      },
      smtpEmail: {
        configured: Boolean(process.env.EMAIL_USER && (process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD)),
      },
      imageCache: {
        totalCachedAssets: imageCache.size,
        hitRatio,
      },
    },
  });
});

export default router;
