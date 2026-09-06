import fs from "fs";
import path from "path";
import crypto from "crypto";
import { publicDir, distDir, rootDir } from "../config/env.js";

export interface ImageCacheEntry {
  buffer: Buffer;
  contentType: string;
  etag: string;
  lastModified: Date;
  size: number;
  hitCount: number;
  cachedAt: number;
}

export const imageCache = new Map<string, ImageCacheEntry>();
export let cacheHitCount = 0;
export let cacheMissCount = 0;

export function incrementCacheHit() {
  cacheHitCount++;
}

export function incrementCacheMiss() {
  cacheMissCount++;
}

export function resolveImageFilename(input: string): string {
  const normalized = (input || "").trim().toLowerCase().replace(/_/g, "-");
  if (
    normalized === "profile" ||
    normalized === "profile.jpg" ||
    normalized === "profile.jpeg" ||
    normalized === "profiles" ||
    normalized === "profiles.jpeg" ||
    normalized === "profile-pic" ||
    normalized === "avatar"
  ) {
    return "profiles.jpg";
  }
  if (normalized === "presia" || normalized === "presia.png") return "presia.png";
  if (
    normalized === "forge" ||
    normalized === "forge.png" ||
    normalized === "forge-image" ||
    normalized === "forge-image.png" ||
    normalized === "forge-img" ||
    normalized === "forge-img.png"
  ) {
    if (fs.existsSync(path.join(publicDir, "images", "forge-image.png"))) return "forge-image.png";
    if (fs.existsSync(path.join(publicDir, "images", "forge.png"))) return "forge.png";
    if (fs.existsSync(path.join(publicDir, "images", "forge.svg"))) return "forge.svg";
    return "forge-image.png";
  }
  if (normalized === "electrica" || normalized === "electrica.png") return "electrica.png";
  if (normalized === "abdfolio" || normalized === "abdfolio.png") return "abdfolio.png";

  if (
    normalized.endsWith(".jpg") ||
    normalized.endsWith(".jpeg") ||
    normalized.endsWith(".png") ||
    normalized.endsWith(".webp") ||
    normalized.endsWith(".svg")
  ) {
    return normalized;
  }
  return `${normalized}.png`;
}

export function getContentType(filename: string): string {
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  if (filename.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

export function loadAndCacheImage(filename: string): ImageCacheEntry | null {
  const possiblePaths = [
    path.join(publicDir, "images", filename),
    path.join(distDir, "images", filename),
    path.join(rootDir, "src", "assets", "images", filename),
    path.join(rootDir, "public", "images", filename),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const stats = fs.statSync(p);
        const buffer = fs.readFileSync(p);
        const hash = crypto.createHash("md5").update(buffer).digest("hex");
        const etag = `"${hash}"`;
        const entry: ImageCacheEntry = {
          buffer,
          contentType: getContentType(filename),
          etag,
          lastModified: stats.mtime,
          size: buffer.length,
          hitCount: 0,
          cachedAt: Date.now(),
        };
        imageCache.set(filename, entry);
        return entry;
      } catch (err) {
        console.error(`[CACHE ERROR] Failed reading ${p}:`, err);
      }
    }
  }
  return null;
}

export function prewarmImageCache() {
  const possibleDirs = [
    path.join(publicDir, "images"),
    path.join(distDir, "images"),
  ];

  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (/\.(png|jpe?g|svg|webp)$/i.test(file)) {
            loadAndCacheImage(file);
          }
        }
      } catch (e) {
        console.error(`[CACHE INIT] Error scanning ${dir}:`, e);
      }
    }
  }
  console.log(`[CACHE READY] Pre-warmed ${imageCache.size} assets into memory cache.`);
}

prewarmImageCache();
