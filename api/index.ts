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
        from: `"Portfolio Contact" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `✨ New Inquiry from ${cleanName} via Portfolio`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nIP: ${clientIp}\nDate: ${new Date().toLocaleString()}\n\nMessage:\n${cleanMessage}`,
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
      message: "Message received and logged securely with user IP address!",
      delivered: emailStatus === "sent",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    res.status(500).json({ error: "Failed to save message. Please try again later." });
  }
});

export default app;
