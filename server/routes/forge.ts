import { Router } from "express";
import { getForgeDownloadUrl } from "../config/env.js";

const router = Router();

// Forge Desktop App Status & metadata endpoint (automatic detection for frontend)
router.get(["/forge/status", "/projects/forge/status"], (req, res) => {
  const forgeUrl = getForgeDownloadUrl();
  const isAvailable = Boolean(forgeUrl);

  res.json({
    available: isAvailable,
    version: "3.0.2",
    name: "Forge",
    title: "Forge - Electron Desktop Workspace & Task Engine",
    downloadUrl: isAvailable ? "/api/forge/download" : null,
    directUrl: forgeUrl || null,
    size: "74.8 MB (Windows x64 / Portable)",
    distributionType: "Windows Installer (.exe) & Portable Executable",
    releaseNotes: isAvailable
      ? "Production installer build (v3.0.2) ready for direct download."
      : "Windows installer build (v3.0.2) is in progress and will be available shortly.",
  });
});

// Forge Desktop App Download redirect endpoint
router.get(["/forge/download", "/download/forge"], (req, res) => {
  const forgeUrl = getForgeDownloadUrl();
  if (forgeUrl) {
    return res.redirect(302, forgeUrl);
  }

  return res.status(200).json({
    status: "pending_link",
    message: "Forge desktop installer build (74.8 MB) download link can be set via FORGE_DOWNLOAD_URL in environment settings.",
    software: "Forge - Electron Desktop Workspace",
    version: "3.0.2",
    target: "Windows (x64) Installer & Portable",
  });
});

export default router;
