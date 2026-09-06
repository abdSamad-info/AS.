import { Resend } from "resend";

/**
 * Resend Email Service Configuration & Client Wrapper
 * 
 * Configured as requested for future integration.
 * The API key can be set in the environment variables as `RESEND_API_KEY`.
 * This module uses lazy initialization so it never crashes on startup if the key is empty.
 * Not active in the application flow until you are ready to enable it.
 */

export interface ResendEmailPayload {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

export interface ResendConfig {
  apiKey: string | undefined;
  defaultSender: string;
  isConfigured: boolean;
}

// Lazy-initialized Resend client singleton
let resendClient: Resend | null = null;

export function getResendConfig(): ResendConfig {
  const apiKey = process.env.RESEND_API_KEY;
  return {
    apiKey,
    defaultSender: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    isConfigured: Boolean(apiKey && apiKey.trim().length > 0),
  };
}

/**
 * Retrieves the Resend client instance.
 * Throws a clear error only when explicitly invoked without an API key.
 */
export function getResendClient(): Resend {
  const config = getResendConfig();
  if (!config.isConfigured || !config.apiKey) {
    throw new Error(
      "[RESEND CONFIG] RESEND_API_KEY is not defined in environment variables. Add RESEND_API_KEY in your settings to activate Resend."
    );
  }

  if (!resendClient) {
    resendClient = new Resend(config.apiKey.trim());
  }

  return resendClient;
}

/**
 * Helper template to dispatch an email via Resend when ready.
 * (Not hooked into active routes until you choose to implement it).
 */
export async function sendEmailWithResend(payload: ResendEmailPayload) {
  const config = getResendConfig();
  if (!config.isConfigured) {
    return {
      success: false,
      message: "Resend is not active yet. Set RESEND_API_KEY to send emails via Resend.",
      delivered: false,
    };
  }

  const client = getResendClient();
  const fromAddress = payload.from || config.defaultSender;

  const result = await client.emails.send({
    from: fromAddress,
    to: payload.to,
    subject: payload.subject,
    html: payload.html || payload.text || "",
    text: payload.text,
    replyTo: payload.replyTo,
    tags: payload.tags,
  });

  return {
    success: true,
    data: result,
    delivered: true,
  };
}
