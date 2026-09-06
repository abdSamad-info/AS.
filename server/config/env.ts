import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const rootDir = process.cwd();
export const publicDir = path.join(rootDir, "public");
export const distDir = path.join(rootDir, "dist");

export const PORT = 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
export const PERSONAL_EMAIL = process.env.PERSONAL_EMAIL || process.env.EMAIL_USER || "";

// Secret key for Cloud Scheduler / health ping authentication
export const CRON_SECRET = process.env.CRON_SECRET || process.env.HEALTH_CHECK_SECRET || "";

// Resolve Forge download URL from various environment aliases
export function getForgeDownloadUrl(): string | null {
  const url =
    process.env.FORGE_DOWNLOAD_URL ||
    process.env.VITE_FORGE_DOWNLOAD_URL ||
    process.env.FORGE_URL ||
    process.env.FORGE_RELEASE_URL ||
    process.env.FORGE_EXE_URL ||
    process.env.FORGE_INSTALLER_URL;
  return url && url.trim() !== "" ? url.trim() : null;
}
