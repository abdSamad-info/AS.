import express from "express";
import { helmetMiddleware, corsMiddleware, apiLimiter } from "./middleware/security.js";
import { publicDir } from "./config/env.js";

// Routes
import healthRouter from "./routes/health.js";
import contactRouter from "./routes/contact.js";
import forgeRouter from "./routes/forge.js";
import mediaRouter from "./routes/media.js";
import adminRouter from "./routes/admin.js";

export function createExpressApp(): express.Express {
  const app = express();

  // Reverse proxy support for Cloud Run and container ingress
  app.set("trust proxy", 1);

  // Core Security & Headers
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(express.json({ limit: "50kb" }));

  // General API Rate Limiting (Health/Cron paths are automatically bypassed)
  app.use("/api", apiLimiter);

  // Mount API Routers
  app.use("/api", healthRouter);
  app.use("/api", contactRouter);
  app.use("/api", forgeRouter);
  app.use("/api", mediaRouter);
  app.use("/api", adminRouter);

  // Top-level aliases for direct access & Vercel serverless functions
  app.use(healthRouter);
  app.use(contactRouter);
  app.use(forgeRouter);
  app.use(mediaRouter);
  app.use(adminRouter);

  // Serve static assets from public directory
  app.use(express.static(publicDir));

  return app;
}
