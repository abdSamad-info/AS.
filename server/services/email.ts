import nodemailer from "nodemailer";
import { PERSONAL_EMAIL } from "../config/env.js";

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
      pass: pass.replace(/\s+/g, ""), // strip spaces from Google App Password
    },
  });
}

export function buildInquiryEmailHtml(params: {
  cleanName: string;
  cleanEmail: string;
  cleanMessage: string;
  clientIp: string;
  recipientEmail: string;
}): string {
  const { cleanName, cleanEmail, cleanMessage, clientIp, recipientEmail } = params;

  return `
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
  `;
}
