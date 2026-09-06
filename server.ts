import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { createExpressApp } from "./server/app.js";
import { PORT, distDir, rootDir } from "./server/config/env.js";

dotenv.config();

async function startServer() {
  const app = createExpressApp();

  // Development (Vite middleware) vs Production (dist static serving)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(distDir, {
        maxAge: "31536000",
        setHeaders: (res, filePath) => {
          if (filePath.endsWith("sw.js")) {
            res.set("Cache-Control", "no-cache, no-store, must-revalidate");
          } else if (filePath.endsWith(".html")) {
            res.set("Cache-Control", "public, max-age=0, must-revalidate, stale-while-revalidate=86400");
          } else if (filePath.includes("/assets/")) {
            res.set("Cache-Control", "public, max-age=31536000, immutable");
          } else if (
            filePath.endsWith(".svg") ||
            filePath.endsWith(".png") ||
            filePath.endsWith(".jpg") ||
            filePath.endsWith(".xml") ||
            filePath.endsWith(".txt") ||
            filePath.endsWith(".pdf")
          ) {
            res.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=2592000");
          }
        },
      })
    );
  }

  // Catch-all route for Single Page Application navigation
  app.get("*", (req, res) => {
    const indexPath = path.join(
      rootDir,
      process.env.NODE_ENV === "production" ? "dist" : ".",
      "index.html"
    );
    res.set("Cache-Control", "public, max-age=0, must-revalidate, stale-while-revalidate=86400");
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).send("Application root not found");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SUCCESS] Backend server listening on http://0.0.0.0:${PORT}`);
    console.log(`[HEALTH] Cloud Scheduler endpoint active at http://0.0.0.0:${PORT}/api/health/ping`);
    console.log(`[SECURITY] Helmet, CORS, Rate-limiting & Cloud Scheduler auth active.`);
  });
}

startServer();
