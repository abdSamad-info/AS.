import { Router } from "express";
import path from "path";
import {
  imageCache,
  cacheHitCount,
  cacheMissCount,
  incrementCacheHit,
  incrementCacheMiss,
  resolveImageFilename,
  loadAndCacheImage,
} from "../services/cache.js";
import { publicDir } from "../config/env.js";

const router = Router();

// Fast In-Memory Cached Media & Image API
router.get(
  ["/images/:filename", "/media/:filename", "/profile-image"],
  (req, res) => {
    const rawParam = req.params.filename || "profiles.jpg";
    const filename = resolveImageFilename(rawParam);

    // Cross-origin & security headers for media
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, If-None-Match, If-Modified-Since"
    );
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

    let entry = imageCache.get(filename);
    let isHit = true;

    if (!entry) {
      isHit = false;
      entry = loadAndCacheImage(filename);
    }

    if (!entry) {
      return res.status(404).json({
        error: "Image asset not found",
        requested: rawParam,
        resolved: filename,
      });
    }

    if (isHit) {
      incrementCacheHit();
      entry.hitCount++;
    } else {
      incrementCacheMiss();
    }

    // Check HTTP Conditional Request Headers for instant 304 Not Modified
    const clientEtag = req.headers["if-none-match"];
    if (clientEtag && (clientEtag === entry.etag || clientEtag === `W/${entry.etag}`)) {
      res.setHeader("X-Cache", "HIT-304");
      res.setHeader("ETag", entry.etag);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable, stale-while-revalidate=86400");
      return res.status(304).end();
    }

    const ifModifiedSince = req.headers["if-modified-since"];
    if (ifModifiedSince) {
      const clientDate = new Date(ifModifiedSince);
      if (!isNaN(clientDate.getTime()) && clientDate >= entry.lastModified) {
        res.setHeader("X-Cache", "HIT-304");
        res.setHeader("ETag", entry.etag);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable, stale-while-revalidate=86400");
        return res.status(304).end();
      }
    }

    // Set High-Performance Caching & Content Headers
    res.setHeader("Content-Type", entry.contentType);
    res.setHeader("Content-Length", entry.size.toString());
    res.setHeader("ETag", entry.etag);
    res.setHeader("Last-Modified", entry.lastModified.toUTCString());
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable, stale-while-revalidate=86400");
    res.setHeader("X-Cache", isHit ? "HIT" : "MISS");
    res.setHeader("X-Cache-Hits", entry.hitCount.toString());

    return res.status(200).send(entry.buffer);
  }
);

// Cache Metrics & Asset Manifest API
router.get("/cache/stats", (req, res) => {
  const items = Array.from(imageCache.entries()).map(([name, entry]) => ({
    name,
    sizeKb: (entry.size / 1024).toFixed(1) + " KB",
    contentType: entry.contentType,
    hits: entry.hitCount,
    cachedAt: new Date(entry.cachedAt).toISOString(),
  }));

  const totalRequests = cacheHitCount + cacheMissCount;
  const hitRatio = totalRequests > 0 ? ((cacheHitCount / totalRequests) * 100).toFixed(1) + "%" : "100%";

  res.json({
    status: "active",
    engine: "In-Memory Buffer Cache with ETag & Conditional 304",
    totalCachedAssets: imageCache.size,
    totalHits: cacheHitCount,
    totalMisses: cacheMissCount,
    hitRatio,
    assets: items,
  });
});

// Resume download endpoint
router.get(["/resume/download", "/resume"], (req, res) => {
  const resumePath = path.join(publicDir, "Abdul-Samad-Resume.pdf");
  res.download(resumePath, "Abdul-Samad-Resume.pdf", (err) => {
    if (err) {
      res.sendFile(resumePath);
    }
  });
});

export default router;
