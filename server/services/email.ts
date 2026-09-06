import nodemailer from "nodemailer";
import { Resend } from "resend";
import { PERSONAL_EMAIL } from "../config/env.js";
import { logSecurityEvent } from "./logger.js";

// Lazy-initialized Resend client singleton
let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.trim().length === 0) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(key.trim());
  }
  return resendClient;
}

export function getResendFromAddress(): string {
  const fromEnv = process.env.RESEND_FROM_EMAIL;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  // Default to verified domain on Resend
  return "Abdul Samad <contact@abdsamad.online>";
}

// Nodemailer fallback transport
export function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, ""),
    },
  });
}

/**
 * Builds a modern, high-contrast, responsive HTML email template
 * styled with the portfolio's signature dark luxury aesthetic.
 */
export function buildInquiryEmailHtml(params: {
  cleanName: string;
  cleanEmail: string;
  cleanMessage: string;
  clientIp: string;
  recipientEmail: string;
  provider?: string;
}): string {
  const { cleanName, cleanEmail, cleanMessage, clientIp, recipientEmail, provider = "Resend API" } = params;
  const now = new Date();
  const formattedDate = now.toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>New Portfolio Inquiry: ${cleanName}</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 28px 14px; background-color: #06070b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f1f5f9;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #0c0e17; border-radius: 16px; border: 1px solid #1e2238; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);">
      
      <!-- Top Neon Header Accent Line -->
      <tr>
        <td style="height: 3px; background: linear-gradient(90deg, #3d5afe 0%, #00e5ff 50%, #7c4dff 100%);"></td>
      </tr>

      <!-- Header Section -->
      <tr>
        <td style="padding: 32px 36px 24px 36px; background: linear-gradient(180deg, #101322 0%, #0c0e17 100%); border-bottom: 1px solid #1a1d30;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <span style="display: inline-block; padding: 5px 12px; background-color: rgba(61, 90, 254, 0.12); border: 1px solid rgba(61, 90, 254, 0.35); border-radius: 999px; font-size: 11px; font-weight: 700; color: #3d5afe; text-transform: uppercase; letter-spacing: 1.2px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                  ✦ INBOUND PORTFOLIO INQUIRY
                </span>
                <h1 style="margin: 14px 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.25;">
                  New Message from ${cleanName}
                </h1>
                <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                  Received through your official portfolio contact form (<a href="https://www.abdsamad.online" style="color: #3d5afe; text-decoration: none;">abdsamad.online</a>)
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Main Body -->
      <tr>
        <td style="padding: 32px 36px;">
          
          <!-- Sender Details Card -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121524; border: 1px solid #1e2238; border-radius: 12px; margin-bottom: 26px;">
            <tr>
              <td style="padding: 20px 22px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 13px; color: #94a3b8; width: 120px;"><strong>Sender Name:</strong></td>
                    <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #ffffff;">${cleanName}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 13px; color: #94a3b8;"><strong>Email Address:</strong></td>
                    <td style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #3d5afe;">
                      <a href="mailto:${cleanEmail}" style="color: #3d5afe; text-decoration: none;">${cleanEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 12px; color: #64748b;"><strong>Received Time:</strong></td>
                    <td style="padding-bottom: 10px; font-size: 12px; color: #cbd5e1; font-family: ui-monospace, SFMono-Regular, monospace;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; font-size: 12px; color: #64748b;"><strong>Client IP:</strong></td>
                    <td style="padding-bottom: 10px; font-size: 12px; color: #94a3b8; font-family: ui-monospace, SFMono-Regular, monospace;">${clientIp}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748b;"><strong>Delivery Engine:</strong></td>
                    <td style="font-size: 12px; color: #10b981; font-weight: 600;">
                      ● ${provider} · Verified Domain (abdsamad.online)
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Message Content Box -->
          <div style="margin-bottom: 30px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #94a3b8; margin-bottom: 10px;">
              Message Content
            </div>
            <div style="background-color: #141728; border-left: 3px solid #3d5afe; border-radius: 8px; padding: 22px; color: #f1f5f9; font-size: 15px; line-height: 1.75; white-space: pre-wrap; word-break: break-word;">${cleanMessage}</div>
          </div>

          <!-- Quick Action Button -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
            <tr>
              <td align="center">
                <a href="mailto:${cleanEmail}?subject=Re:%20Portfolio%20Inquiry%20from%20Abdul%20Samad" style="display: inline-block; background: linear-gradient(135deg, #3d5afe 0%, #2940d3 100%); color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 13px 32px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.8px; box-shadow: 0 4px 18px rgba(61, 90, 254, 0.45);">
                  Reply to ${cleanName} &rarr;
                </a>
              </td>
            </tr>
          </table>
          <p style="margin: 0; text-align: center; font-size: 12px; color: #64748b;">
            (Clicking reply in your email client will also respond directly to ${cleanEmail})
          </p>

        </td>
      </tr>

      <!-- Footer Section -->
      <tr>
        <td style="padding: 22px 36px; background-color: #080910; border-top: 1px solid #181b2e; text-align: center;">
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; line-height: 1.5;">
            &copy; 2026 Abdul Samad · Full Stack & Backend Engineer · Portfolio Contact System
          </p>
          <p style="margin: 0; font-size: 11px; color: #475569;">
            Delivered to <span style="color: #94a3b8;">${recipientEmail}</span> via verified domain <span style="color: #3d5afe;">abdsamad.online</span>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

/**
 * Builds clean plain-text fallback version for email clients and spam filter scoring.
 */
export function buildInquiryEmailText(params: {
  cleanName: string;
  cleanEmail: string;
  cleanMessage: string;
  clientIp: string;
  recipientEmail: string;
}): string {
  const { cleanName, cleanEmail, cleanMessage, clientIp, recipientEmail } = params;
  return `
NEW PORTFOLIO INQUIRY
=====================
Sender: ${cleanName}
Email: ${cleanEmail}
Client IP: ${clientIp}
Delivered To: ${recipientEmail}
Timestamp: ${new Date().toUTCString()}

MESSAGE:
---------------------
${cleanMessage}

---------------------
Reply directly to this email to respond to ${cleanName} (${cleanEmail}).
Abdul Samad Portfolio · https://www.abdsamad.online
  `.trim();
}

/**
 * Primary email dispatcher:
 * 1. Dispatches via Resend using the verified domain (contact@abdsamad.online)
 * 2. Falls back to Nodemailer (Google App Passwords) if Resend is unavailable
 * 3. Falls back to demo logging if neither has live credentials
 */
export async function sendInquiryEmail(params: {
  cleanName: string;
  cleanEmail: string;
  cleanMessage: string;
  clientIp: string;
}): Promise<{
  delivered: boolean;
  provider: "resend" | "nodemailer" | "demo_logged";
  messageId?: string;
  error?: string;
}> {
  const { cleanName, cleanEmail, cleanMessage, clientIp } = params;
  const recipientEmail = PERSONAL_EMAIL;

  const resend = getResendClient();

  // 1. Primary: Resend API Dispatch
  if (resend) {
    try {
      const fromAddress = getResendFromAddress();
      const html = buildInquiryEmailHtml({
        cleanName,
        cleanEmail,
        cleanMessage,
        clientIp,
        recipientEmail,
        provider: "Resend API",
      });
      const text = buildInquiryEmailText({
        cleanName,
        cleanEmail,
        cleanMessage,
        clientIp,
        recipientEmail,
      });

      const response = await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `✨ New Inquiry: ${cleanName} via Portfolio`,
        html,
        text,
      });

      if (response.error) {
        throw new Error(response.error.message || "Resend API returned an error");
      }

      const messageId = response.data?.id;
      logSecurityEvent(
        "EMAIL_DISPATCH",
        clientIp,
        `Email delivered to ${recipientEmail} via Resend from ${fromAddress} (ID: ${messageId})`,
        "success"
      );

      return {
        delivered: true,
        provider: "resend",
        messageId,
      };
    } catch (resendErr: any) {
      console.warn(`[EMAIL] Resend dispatch failed (${resendErr.message}). Attempting Nodemailer fallback...`);
      logSecurityEvent(
        "EMAIL_DISPATCH",
        clientIp,
        `Resend dispatch failed: ${resendErr.message}. Trying fallback.`,
        "warning"
      );
    }
  }

  // 2. Secondary Fallback: Nodemailer
  const transporter = getTransporter();
  if (transporter) {
    try {
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `✨ New Inquiry: ${cleanName} via Portfolio`,
        text: buildInquiryEmailText({
          cleanName,
          cleanEmail,
          cleanMessage,
          clientIp,
          recipientEmail,
        }),
        html: buildInquiryEmailHtml({
          cleanName,
          cleanEmail,
          cleanMessage,
          clientIp,
          recipientEmail,
          provider: "Nodemailer SMTP",
        }),
      };

      const info = await transporter.sendMail(mailOptions);
      logSecurityEvent(
        "EMAIL_DISPATCH",
        clientIp,
        `Email delivered to ${recipientEmail} via Nodemailer fallback`,
        "success"
      );

      return {
        delivered: true,
        provider: "nodemailer",
        messageId: info.messageId,
      };
    } catch (nodemailerErr: any) {
      logSecurityEvent(
        "EMAIL_DISPATCH",
        clientIp,
        `Nodemailer fallback failed: ${nodemailerErr.message}`,
        "error"
      );
      return {
        delivered: false,
        provider: "nodemailer",
        error: nodemailerErr.message,
      };
    }
  }

  // 3. Tertiary Fallback: Demo Log
  logSecurityEvent(
    "FORM_SUBMISSION",
    clientIp,
    `Message received from ${cleanName} (${cleanEmail}). Saved to database.`,
    "success"
  );

  return {
    delivered: false,
    provider: "demo_logged",
  };
}
