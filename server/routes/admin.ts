import { Router } from "express";
import jwt from "jsonwebtoken";
import { authenticateAdmin } from "../middleware/auth.js";
import { getClientIp } from "../middleware/security.js";
import { logSecurityEvent, inMemorySecurityLogs } from "../services/logger.js";
import { safeDbQuery, getDatabaseStatus, inMemorySubmissions, deleteInMemorySubmission } from "../services/db.js";
import { getTransporter } from "../services/email.js";
import { ADMIN_PASSWORD, JWT_SECRET, PERSONAL_EMAIL } from "../config/env.js";

const router = Router();

// Admin Authentication Login
router.post("/admin/login", (req, res) => {
  const { password } = req.body;
  const clientIp = getClientIp(req);

  if (!password) {
    logSecurityEvent("AUTH_FAILURE", clientIp, "Empty admin login password attempted", "warning");
    return res.status(400).json({ error: "Password is required" });
  }

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin", ip: clientIp }, JWT_SECRET, { expiresIn: "12h" });
    logSecurityEvent("ADMIN_LOGIN", clientIp, "Admin logged in successfully", "success");
    return res.json({
      success: true,
      token,
      message: "Admin authentication successful",
    });
  }

  logSecurityEvent("AUTH_FAILURE", clientIp, "Unauthorized admin password attempted", "error");
  return res.status(401).json({ error: "Invalid admin password" });
});

// Admin Endpoint: View Logged Submissions & IP Addresses
router.get("/admin/messages", authenticateAdmin, async (req, res) => {
  const rows = await safeDbQuery(
    "SELECT id, name, email, message, ip, user_agent AS \"userAgent\", email_status AS \"emailStatus\", created_at AS \"createdAt\" FROM contacts ORDER BY id DESC LIMIT 100"
  );
  if (rows && rows.length > 0) {
    return res.json({ messages: rows });
  }
  return res.json({ messages: inMemorySubmissions });
});

// Admin Endpoint: Delete Message
router.delete("/admin/messages/:id", authenticateAdmin, async (req, res) => {
  const id = req.params.id;
  if (id) {
    await safeDbQuery("DELETE FROM contacts WHERE id = $1", [id]);
  }
  deleteInMemorySubmission(id);
  return res.json({ success: true, message: "Message deleted" });
});

// Admin Endpoint: Security Stats & System Status
router.get("/admin/system-status", authenticateAdmin, (req, res) => {
  const hasSmtpConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
  const uniqueIps = new Set(inMemorySubmissions.map((s) => s.ip)).size;
  const dbStatus = getDatabaseStatus();

  return res.json({
    status: "operational",
    serverTime: new Date().toISOString(),
    smtp: {
      configured: hasSmtpConfigured,
      senderUser: process.env.EMAIL_USER || process.env.GMAIL_USER || "Not Set",
      destinationEmail: PERSONAL_EMAIL,
    },
    database: {
      connected: dbStatus.connected,
      type: dbStatus.type,
      status: dbStatus.status,
    },
    security: {
      rateLimiting: "Active (5 submissions / 15 min)",
      cors: "Strict CORS Enabled",
      helmet: "Secure Headers Active",
      totalSubmissionsLogged: inMemorySubmissions.length,
      uniqueClientIps: uniqueIps,
    },
    recentSecurityLogs: inMemorySecurityLogs.slice(0, 20),
  });
});

// Admin Endpoint: Send Test Email
router.post("/admin/test-email", authenticateAdmin, async (req, res) => {
  const transporter = getTransporter();
  const clientIp = getClientIp(req);

  if (!transporter) {
    return res.status(400).json({
      error: "Nodemailer is not configured. Please set EMAIL_USER and EMAIL_PASS (Google App Password) in environment variables.",
    });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Admin Test" <${process.env.EMAIL_USER}>`,
      to: PERSONAL_EMAIL,
      subject: "🔒 Portfolio Security & Nodemailer Test Verification",
      text: `Nodemailer test triggered by Admin.\nTime: ${new Date().toISOString()}\nIP: ${clientIp}`,
      html: `
        <div style="font-family: sans-serif; background: #0c0d14; color: #fff; padding: 20px; border-radius: 10px;">
          <h3 style="color: #3d5afe;">Security & Email Test Successful</h3>
          <p>Your Nodemailer integration with Google App Passwords is operational.</p>
          <p><strong>Destination:</strong> ${PERSONAL_EMAIL}</p>
          <p><strong>Admin IP:</strong> ${clientIp}</p>
        </div>
      `,
    });

    logSecurityEvent("EMAIL_DISPATCH", clientIp, `Test email sent to ${PERSONAL_EMAIL}`, "success");
    return res.json({ success: true, message: `Test email dispatched to ${PERSONAL_EMAIL}` });
  } catch (err: any) {
    logSecurityEvent("EMAIL_DISPATCH", clientIp, `Test email failed: ${err.message}`, "error");
    return res.status(500).json({ error: err.message || "Failed to send test email" });
  }
});

export default router;
