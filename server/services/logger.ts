export interface SecurityLog {
  id: string;
  timestamp: string;
  type: "FORM_SUBMISSION" | "RATE_LIMIT_TRIGGERED" | "ADMIN_LOGIN" | "AUTH_FAILURE" | "EMAIL_DISPATCH" | "CRON_PING";
  ip: string;
  details: string;
  status: "success" | "warning" | "error";
}

export const inMemorySecurityLogs: SecurityLog[] = [
  {
    id: "log-1",
    timestamp: new Date().toISOString(),
    type: "EMAIL_DISPATCH",
    ip: "127.0.0.1",
    details: "Backend services, security middleware, and Cloud Scheduler endpoints initialized.",
    status: "success",
  },
];

export function logSecurityEvent(
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
    status,
  };
  inMemorySecurityLogs.unshift(log);
  if (inMemorySecurityLogs.length > 200) {
    inMemorySecurityLogs.pop();
  }
  console.log(`[SECURITY ${status.toUpperCase()}] [${type}] IP: ${ip} | ${details}`);
}
