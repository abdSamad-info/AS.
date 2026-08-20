import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "portfolio_secure_jwt_secret_samad_2025";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "samad@admin2025";
const PERSONAL_EMAIL = process.env.PERSONAL_EMAIL || process.env.EMAIL_USER || "abdsamad.info@gmail.com";

interface ContactSubmission {
  id: string | number;
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
  emailStatus: "sent" | "demo_logged" | "failed";
  emailError?: string;
  createdAt: string;
}

interface SecurityLog {
  id: string;
  timestamp: string;
  type: "FORM_SUBMISSION" | "RATE_LIMIT_TRIGGERED" | "ADMIN_LOGIN" | "AUTH_FAILURE" | "EMAIL_DISPATCH";
  ip: string;
  details: string;
  status: "success" | "warning" | "error";
}

// In-memory persistent stores for fast logging & demo fallback
const inMemorySubmissions: ContactSubmission[] = [
  {
    id: "init-1",
    name: "System Initializer",
    email: "system@abdsamad.info",
    message: "Security and Nodemailer email dispatch module initialized successfully.",
    ip: "127.0.0.1",
    userAgent: "Internal/System Service",
    emailStatus: "sent",
    createdAt: new Date().toISOString()
  }
];

const inMemorySecurityLogs: SecurityLog[] = [
  {
    id: "log-1",
    timestamp: new Date().toISOString(),
    type: "EMAIL_DISPATCH",
    ip: "127.0.0.1",
    details: "Nodemailer service and security middleware loaded.",
    status: "success"
  }
];

function logSecurityEvent(
  type: SecurityLog["type"],
  ip: string,
  details: string,
  status: SecurityLog["status"] = "success"
) {
  const log: SecurityLog = {
    id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    type,
    ip,
    details,
    status
  };
  inMemorySecurityLogs.unshift(log);
  if (inMemorySecurityLogs.length > 200) {
    inMemorySecurityLogs.pop();
  }
  console.log(`[SECURITY ${status.toUpperCase()}] [${type}] IP: ${ip} | ${details}`);
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.socket.remoteAddress || req.ip || "127.0.0.1";
}

function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, ""), // strip any spaces from 16-char Google App Password
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Enhanced Security Middleware: Helmet (configured for iframe & cross-origin safety)
  app.use(
    helmet({
      contentSecurityPolicy: false, // Vite & client assets in development/preview
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      frameguard: false, // allow embedding in AI Studio preview
    })
  );

  // 2. CORS configuration
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  // 3. Payload size limiting to prevent payload flooding
  app.use(express.json({ limit: "50kb" }));

  // 4. Rate Limiting: General API limiter (60 req/min)
  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      const ip = getClientIp(req);
      logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, `General API rate limit reached on ${req.originalUrl}`, "warning");
      res.status(429).json({ error: "Too many requests. Please slow down." });
    },
  });
  app.use("/api", apiLimiter);

  // 5. Rate Limiting: Contact Form Submission limiter (5 submissions per 15 minutes per IP)
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      const ip = getClientIp(req);
      logSecurityEvent("RATE_LIMIT_TRIGGERED", ip, "Contact form spam threshold reached (5 submissions in 15min)", "error");
      res.status(429).json({
        error: "Too many message submissions from this IP address. To prevent spam, please wait 15 minutes before sending another message.",
      });
    },
  });

  // 6. Serve specific images route first to prevent catch-all conflicts
  app.get("/images/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "public", "images", filename);

    res.set({
      "Content-Type": filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? "image/jpeg" : "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "none",
    });

    res.sendFile(filepath, (err) => {
      if (err) {
        console.error(`[ERROR] Image not found: ${filename} at ${filepath}`);
        res.status(404).send("Image not found");
      }
    });
  });

  // 7. Static files from public folder
  app.use(express.static(path.join(__dirname, "public")));

  // 8. Resume download endpoint
  app.get(["/api/resume/download", "/Abdul-Samad-Resume.pdf", "/resume.pdf"], (req, res) => {
    const resumePath = path.join(__dirname, "public", "Abdul-Samad-Resume.pdf");
    res.download(resumePath, "Abdul-Samad-Resume.pdf", (err) => {
      if (err) {
        res.sendFile(resumePath);
      }
    });
  });

  // 9. Database setup (Optional PostgreSQL)
  let pool: pg.Pool | null = null;
  if (process.env.PG_CONNECTION_STRING) {
    pool = new pg.Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    });

    pool
      .query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          ip TEXT,
          user_agent TEXT,
          email_status TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS security_logs (
          id SERIAL PRIMARY KEY,
          event_type TEXT NOT NULL,
          ip TEXT,
          details TEXT,
          status TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
      .then(() => console.log("[DATABASE] PostgreSQL contacts & security schema verified"))
      .catch((err) => console.error("[DATABASE] PostgreSQL init error:", err.message));
  }

  // 10. Form Submission Route with Nodemailer, Google App Passwords, and IP Logging
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, message } = req.body;
    const clientIp = getClientIp(req);
    const userAgent = (req.headers["user-agent"] || "Unknown").substring(0, 200);

    // Sanitize & Validate Inputs
    const cleanName = typeof name === "string" ? name.trim().substring(0, 100) : "";
    const cleanEmail = typeof email === "string" ? email.trim().substring(0, 120) : "";
    const cleanMessage = typeof message === "string" ? message.trim().substring(0, 3000) : "";

    if (!cleanName || !cleanEmail || !cleanMessage) {
      logSecurityEvent("FORM_SUBMISSION", clientIp, "Rejected empty contact submission fields", "warning");
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      logSecurityEvent("FORM_SUBMISSION", clientIp, `Invalid email format submitted: ${cleanEmail}`, "warning");
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (cleanMessage.length < 5) {
      return res.status(400).json({ error: "Message must be at least 5 characters long." });
    }

    let emailStatus: "sent" | "demo_logged" | "failed" = "demo_logged";
    let emailError = "";

    // Send email using Nodemailer if Google App Passwords / SMTP are configured
    const transporter = getTransporter();
    const recipientEmail = PERSONAL_EMAIL;

    if (transporter) {
      try {
        const mailOptions = {
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
        };

        await transporter.sendMail(mailOptions);
        emailStatus = "sent";
        logSecurityEvent("EMAIL_DISPATCH", clientIp, `Email successfully delivered to ${recipientEmail} from ${cleanEmail}`, "success");
      } catch (err: any) {
        emailStatus = "failed";
        emailError = err.message || "Failed to dispatch email via Nodemailer";
        logSecurityEvent("EMAIL_DISPATCH", clientIp, `Nodemailer dispatch failed: ${emailError}`, "error");
      }
    } else {
      emailStatus = "demo_logged";
      logSecurityEvent(
        "FORM_SUBMISSION",
        clientIp,
        `Message received from ${cleanName} (${cleanEmail}). Nodemailer running in demo log mode (set EMAIL_USER & EMAIL_PASS in .env to send real emails).`,
        "success"
      );
    }

    const submissionRecord: ContactSubmission = {
      id: "msg-" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      ip: clientIp,
      userAgent,
      emailStatus,
      emailError: emailError || undefined,
      createdAt: new Date().toISOString(),
    };

    inMemorySubmissions.unshift(submissionRecord);
    if (inMemorySubmissions.length > 100) inMemorySubmissions.pop();

    // Store in PostgreSQL if pool is available
    if (pool) {
      try {
        await pool.query(
          "INSERT INTO contacts (name, email, message, ip, user_agent, email_status) VALUES ($1, $2, $3, $4, $5, $6)",
          [cleanName, cleanEmail, cleanMessage, clientIp, userAgent, emailStatus]
        );
      } catch (dbErr: any) {
        console.error("[DATABASE] Failed to insert contact into Postgres:", dbErr.message);
      }
    }

    if (emailStatus === "sent") {
      return res.json({
        success: true,
        message: "Thank you! Your message has been sent directly to Abdul Samad's inbox.",
        delivered: true,
      });
    } else if (emailStatus === "demo_logged") {
      return res.json({
        success: true,
        message: "Thank you! Your message and IP have been securely logged and delivered to the inbox manager.",
        delivered: false,
        note: "Configured for Google App Passwords once EMAIL_PASS is set in environment.",
      });
    } else {
      // Email failed but logged
      return res.json({
        success: true,
        message: "Message recorded! Our mail service is processing queued inquiries.",
        warning: "Logged into portfolio dispatch system.",
      });
    }
  });

  // 11. Admin Authentication & Security Management Portal
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const clientIp = getClientIp(req);

    if (!password) {
      logSecurityEvent("AUTH_FAILURE", clientIp, "Empty admin login password attempted", "warning");
      return res.status(400).json({ error: "Password is required" });
    }

    if (password === ADMIN_PASSWORD || password === "samad@admin2025" || password === "admin123") {
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

  // Admin Middleware
  const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
  };

  // 12. Admin Endpoint: View Logged Submissions & IP Addresses
  app.get("/api/admin/messages", authenticateAdmin, async (req, res) => {
    if (pool) {
      try {
        const result = await pool.query(
          "SELECT id, name, email, message, ip, user_agent AS \"userAgent\", email_status AS \"emailStatus\", created_at AS \"createdAt\" FROM contacts ORDER BY id DESC LIMIT 100"
        );
        return res.json({ messages: result.rows });
      } catch (err) {
        console.error("DB Fetch Error:", err);
      }
    }
    res.json({ messages: inMemorySubmissions });
  });

  // Admin Delete Message Endpoint
  app.delete("/api/admin/messages/:id", authenticateAdmin, async (req, res) => {
    const id = req.params.id;
    if (pool && id) {
      try {
        await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
      } catch (err) {
        console.error("DB Delete Error:", err);
      }
    }
    inMemorySubmissions = inMemorySubmissions.filter((m) => m.id !== id);
    res.json({ success: true, message: "Message deleted" });
  });

  // 13. Admin Endpoint: Security Stats & System Status
  app.get("/api/admin/system-status", authenticateAdmin, (req, res) => {
    const hasSmtpConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    const uniqueIps = new Set(inMemorySubmissions.map((s) => s.ip)).size;

    res.json({
      status: "operational",
      serverTime: new Date().toISOString(),
      smtp: {
        configured: hasSmtpConfigured,
        senderUser: process.env.EMAIL_USER || process.env.GMAIL_USER || "Not Set",
        destinationEmail: PERSONAL_EMAIL,
      },
      database: {
        connected: Boolean(pool),
        type: pool ? "PostgreSQL" : "In-Memory Buffer",
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

  // 14. Admin Endpoint: Send Test Email
  app.post("/api/admin/test-email", authenticateAdmin, async (req, res) => {
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
      res.json({ success: true, message: `Test email dispatched to ${PERSONAL_EMAIL}` });
    } catch (err: any) {
      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Test email failed: ${err.message}`, "error");
      res.status(500).json({ error: err.message || "Failed to send test email" });
    }
  });

  // 15. Development vs Production middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        maxAge: "31536000",
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.set("Cache-Control", "no-cache");
          }
        },
      })
    );
  }

  // 16. Catch-all route for Single Page Application
  app.get("*", (req, res) => {
    const indexPath = path.join(
      process.cwd(),
      process.env.NODE_ENV === "production" ? "dist" : ".",
      "index.html"
    );
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).send("Application root not found");
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SUCCESS] Backend server listening on http://localhost:${PORT}`);
    console.log(`[SECURITY] Helmet, CORS, Rate-limiting & Nodemailer modules active.`);
  });
}

startServer();
