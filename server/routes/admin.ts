import { Router } from "express";
import jwt from "jsonwebtoken";
import { authenticateAdmin } from "../middleware/auth.js";
import { getClientIp, getRateLimiterMetrics } from "../middleware/security.js";
import { logSecurityEvent, inMemorySecurityLogs } from "../services/logger.js";
import { safeDbQuery, getDatabaseStatus, inMemorySubmissions, deleteInMemorySubmission } from "../services/db.js";
import { getTransporter, getResendClient, getResendFromAddress } from "../services/email.js";
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
  const hasResendConfigured = Boolean(process.env.RESEND_API_KEY);
  const uniqueIps = new Set(inMemorySubmissions.map((s) => s.ip)).size;
  const dbStatus = getDatabaseStatus();

  return res.json({
    status: "operational",
    serverTime: new Date().toISOString(),
    resend: {
      configured: hasResendConfigured,
      senderFrom: getResendFromAddress(),
      destinationEmail: PERSONAL_EMAIL,
    },
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
    rateLimiter: getRateLimiterMetrics(),
    security: {
      rateLimiting: "Active (Robust Memory Store: 60 req/min API, 5 req/15min Contact)",
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
  const clientIp = getClientIp(req);
  const resend = getResendClient();

  // Try Resend first
  if (resend) {
    try {
      const from = getResendFromAddress();
      const sendResult = await resend.emails.send({
        from,
        to: PERSONAL_EMAIL,
        subject: "🔒 Resend Email Verification & Test Successful",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0e17; color: #f1f5f9; padding: 28px; border-radius: 12px; border: 1px solid #1e2238;">
            <span style="background: rgba(61,90,254,0.15); border: 1px solid rgba(61,90,254,0.3); color: #3d5afe; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; letter-spacing: 1px;">TEST DISPATCH</span>
            <h2 style="color: #ffffff; margin: 14px 0 8px 0;">Resend Dispatch is Operational</h2>
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">Your verified domain (<strong>${from}</strong>) is actively delivering incoming portfolio inquiries to your inbox.</p>
            <table style="width: 100%; font-size: 13px; color: #94a3b8; border-collapse: collapse;">
              <tr><td style="padding: 6px 0;"><strong>Recipient:</strong></td><td style="color: #ffffff;">${PERSONAL_EMAIL}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Sender:</strong></td><td style="color: #ffffff;">${from}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Admin IP:</strong></td><td style="color: #cbd5e1; font-family: monospace;">${clientIp}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Timestamp:</strong></td><td>${new Date().toUTCString()}</td></tr>
            </table>
          </div>
        `,
        text: `Resend test successful! Delivered to ${PERSONAL_EMAIL} from ${from} at ${new Date().toISOString()}`,
      });

      if (sendResult.error) {
        throw new Error(sendResult.error.message || "Resend test dispatch error");
      }

      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Resend test email sent to ${PERSONAL_EMAIL}`, "success");
      return res.json({
        success: true,
        provider: "resend",
        message: `Test email dispatched to ${PERSONAL_EMAIL} via Resend (${from})`,
        id: sendResult.data?.id,
      });
    } catch (err: any) {
      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Resend test email failed: ${err.message}`, "warning");
    }
  }

  // Fallback to Nodemailer
  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Admin Test" <${process.env.EMAIL_USER}>`,
        to: PERSONAL_EMAIL,
        subject: "🔒 Portfolio Security & Nodemailer Test Verification",
        text: `Nodemailer test triggered by Admin.\nTime: ${new Date().toISOString()}\nIP: ${clientIp}`,
        html: `
          <div style="font-family: sans-serif; background: #0c0d14; color: #fff; padding: 20px; border-radius: 10px;">
            <h3 style="color: #3d5afe;">Security & Email Test Successful</h3>
            <p>Your Nodemailer integration is operational.</p>
            <p><strong>Destination:</strong> ${PERSONAL_EMAIL}</p>
            <p><strong>Admin IP:</strong> ${clientIp}</p>
          </div>
        `,
      });

      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Test email sent to ${PERSONAL_EMAIL} via Nodemailer`, "success");
      return res.json({ success: true, provider: "nodemailer", message: `Test email dispatched to ${PERSONAL_EMAIL} via Nodemailer` });
    } catch (err: any) {
      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Test email failed: ${err.message}`, "error");
      return res.status(500).json({ error: err.message || "Failed to send test email" });
    }
  }

  return res.status(400).json({
    error: "No email dispatch service is configured. Add RESEND_API_KEY or EMAIL_USER/EMAIL_PASS in environment variables.",
  });
});

export default router;
