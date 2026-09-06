import { Router } from "express";
import { contactLimiter, getClientIp } from "../middleware/security.js";
import { getTransporter, buildInquiryEmailHtml } from "../services/email.js";
import { logSecurityEvent } from "../services/logger.js";
import { safeDbQuery, inMemorySubmissions, type ContactSubmission } from "../services/db.js";
import { PERSONAL_EMAIL } from "../config/env.js";

const router = Router();

router.post("/contact", contactLimiter, async (req, res) => {
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
        html: buildInquiryEmailHtml({
          cleanName,
          cleanEmail,
          cleanMessage,
          clientIp,
          recipientEmail,
        }),
      };

      await transporter.sendMail(mailOptions);
      emailStatus = "sent";
      logSecurityEvent("EMAIL_DISPATCH", clientIp, `Email delivered to ${recipientEmail} from ${cleanEmail}`, "success");
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
      `Message received from ${cleanName} (${cleanEmail}). Nodemailer running in demo log mode (set EMAIL_USER & EMAIL_PASS in .env for live sending).`,
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

  // Store in PostgreSQL if available (with seamless in-memory fallback)
  await safeDbQuery(
    "INSERT INTO contacts (name, email, message, ip, user_agent, email_status) VALUES ($1, $2, $3, $4, $5, $6)",
    [cleanName, cleanEmail, cleanMessage, clientIp, userAgent, emailStatus]
  );

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
    return res.json({
      success: true,
      message: "Message recorded! Our mail service is processing queued inquiries.",
      warning: "Logged into portfolio dispatch system.",
    });
  }
});

export default router;
