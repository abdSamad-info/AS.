import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, CRON_SECRET } from "../config/env.js";
import { getClientIp } from "./security.js";
import { logSecurityEvent } from "../services/logger.js";

export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token expired or invalid" });
  }
}

/**
 * Middleware to secure Cloud Scheduler and health ping requests.
 * 
 * Verification order:
 * 1. `x-cron-secret` HTTP Header
 * 2. `Authorization: Bearer <CRON_SECRET>` Header
 * 3. `?secret=<CRON_SECRET>` URL Query Parameter
 * 
 * If `CRON_SECRET` is configured in `.env`, the request MUST provide matching credentials.
 * If `CRON_SECRET` is not yet set in `.env`, the endpoint runs in permissive mode so
 * initial Cloud Scheduler setup runs seamlessly without false-positive failures.
 */
export function authenticateCron(req: Request, res: Response, next: NextFunction) {
  const clientIp = getClientIp(req);

  // If no secret is configured, run in permissive mode
  if (!CRON_SECRET || CRON_SECRET.trim().length === 0) {
    return next();
  }

  const headerSecret = req.headers["x-cron-secret"];
  const authHeader = req.headers.authorization;
  const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  const querySecret = typeof req.query.secret === "string" ? req.query.secret : null;

  const providedSecret = headerSecret || bearerSecret || querySecret;

  if (providedSecret && providedSecret === CRON_SECRET) {
    return next();
  }

  logSecurityEvent("AUTH_FAILURE", clientIp, `Unauthorized Cloud Scheduler ping attempt to ${req.originalUrl}`, "error");
  return res.status(401).json({
    error: "Unauthorized: Invalid or missing Cloud Scheduler credentials.",
    hint: "Provide the secret via 'x-cron-secret' header, 'Authorization: Bearer <secret>', or '?secret=<secret>' query parameter.",
  });
}
