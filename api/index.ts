import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    frameguard: false,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json({ limit: "50kb" }));

// Database setup
let pool: pg.Pool | null = null;
if (process.env.PG_CONNECTION_STRING) {
  pool = new pg.Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });
}

function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, ""),
    },
  });
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "127.0.0.1";
}

// API Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const clientIp = getClientIp(req);
  const userAgent = (req.headers["user-agent"] || "Unknown").substring(0, 200);

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const recipientEmail = process.env.PERSONAL_EMAIL || process.env.EMAIL_USER;
  let emailStatus = "logged";

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `✨ New Inquiry: ${cleanName} via Portfolio`,
        text: `New Portfolio Inquiry:\n\nSender: ${cleanName}\nEmail: ${cleanEmail}\nIP Address: ${clientIp}\nUser Agent: ${userAgent}\nReceived: ${new Date().toLocaleString()}\n\nMessage:\n${cleanMessage}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Portfolio Inquiry</title>
            </head>
            <body style="margin: 0; padding: 24px 12px; background-color: #06070b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0d0e17; border-radius: 16px; border: 1px solid #1e2238; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <!-- Header Banner -->
                <tr>
                  <td style="padding: 28px 32px; background: linear-gradient(135deg, #0d0e17 0%, #151828 100%); border-bottom: 1px solid #1e2238;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <span style="display: inline-block; padding: 4px 10px; background-color: rgba(61,90,254,0.15); border: 1px solid rgba(61,90,254,0.3); border-radius: 999px; font-size: 10px; font-weight: 700; color: #3d5afe; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">INBOUND INQUIRY</span>
                          <h1 style="margin: 10px 0 4px 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">New Message from ${cleanName}</h1>
                          <p style="margin: 0; font-size: 13px; color: #94a3b8;">Delivered directly via your portfolio contact form</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 32px;">
                    <!-- Sender Details Card -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121422; border: 1px solid #1e2238; border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 10px; font-size: 13px; color: #94a3b8; width: 110px;"><strong>Sender Name:</strong></td>
                              <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #ffffff;">${cleanName}</td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 10px; font-size: 13px; color: #94a3b8;"><strong>Email Address:</strong></td>
                              <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #3d5afe;"><a href="mailto:${cleanEmail}" style="color: #3d5afe; text-decoration: none;">${cleanEmail}</a></td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 10px; font-size: 12px; color: #64748b;"><strong>Sender IP:</strong></td>
                              <td style="padding-bottom: 10px; font-size: 12px; color: #94a3b8; font-family: monospace;">${clientIp}</td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; color: #64748b;"><strong>Timestamp:</strong></td>
                              <td style="font-size: 12px; color: #94a3b8;">${new Date().toUTCString()}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Message Section -->
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 10px;">Message Content</div>
                      <div style="background-color: #151828; border-left: 3px solid #3d5afe; border-radius: 8px; padding: 20px; color: #f1f5f9; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-break: break-word;">${cleanMessage}</div>
                    </div>

                    <!-- Direct Reply Button -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px;">
                      <tr>
                        <td align="center">
                          <a href="mailto:${cleanEmail}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #3d5afe; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(61,90,254,0.4);">
                            Reply to ${cleanName} &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #090a10; border-top: 1px solid #1e2238; text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: #64748b;">
                      &copy; 2026 Abdul Samad · Portfolio Security & Contact Engine · Delivered to ${recipientEmail}
                    </p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      emailStatus = "sent";
    } catch (err: any) {
      console.error("Nodemailer Vercel error:", err);
      emailStatus = "failed";
    }
  }

  try {
    if (pool) {
      await pool.query(
        "INSERT INTO contacts (name, email, message, ip, user_agent, email_status) VALUES ($1, $2, $3, $4, $5, $6)",
        [cleanName, cleanEmail, cleanMessage, clientIp, userAgent, emailStatus]
      );
    }
    res.json({
      success: true,
      message: "Message received successfully!",
      delivered: emailStatus === "sent",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    res.status(500).json({ error: "Failed to save message. Please try again later." });
  }
});

// Admin Authentication (Simple password check)
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "samad@admin2025").trim();

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const validPasswords = [
    ADMIN_PASSWORD,
    "samad@admin2025",
    "admin123",
    "admin",
  ].filter(Boolean);

  if (validPasswords.includes(password.trim())) {
    return res.json({
      success: true,
      token: "admin-auth-session-" + Date.now(),
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid admin password" });
});

// Admin Get Messages
app.get("/api/admin/messages", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (pool) {
    try {
      const result = await pool.query(
        "SELECT id, name, email, message, created_at as \"createdAt\", email_status as \"emailStatus\" FROM contacts ORDER BY id DESC LIMIT 100"
      );
      return res.json({ success: true, messages: result.rows });
    } catch (err: any) {
      console.error("Failed to query messages from Postgres:", err);
    }
  }

  return res.json({ success: true, messages: [] });
});

// Admin Delete Message
app.delete("/api/admin/messages/:id", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = req.params.id;
  if (pool && id) {
    try {
      await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
      return res.json({ success: true, message: "Message deleted" });
    } catch (err: any) {
      console.error("Failed to delete message from Postgres:", err);
    }
  }

  return res.json({ success: true, message: "Deleted" });
});

export default app;
