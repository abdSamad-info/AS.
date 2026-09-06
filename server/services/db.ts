import pg from "pg";

export interface ContactSubmission {
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

// In-memory persistent store for demo fallback / without PostgreSQL
export let inMemorySubmissions: ContactSubmission[] = [
  {
    id: "init-1",
    name: "System Initializer",
    email: "system@abdsamad.info",
    message: "Security, email dispatch, and database modules initialized successfully.",
    ip: "127.0.0.1",
    userAgent: "Internal/System Service",
    emailStatus: "sent",
    createdAt: new Date().toISOString(),
  },
];

export function deleteInMemorySubmission(id: string | number) {
  inMemorySubmissions = inMemorySubmissions.filter((m) => String(m.id) !== String(id));
}

/**
 * Validates whether the provided string is a legitimate PostgreSQL connection URI.
 * Rejects invalid strings, placeholders, or malformed inputs (e.g. "10", "base", etc.)
 * that cause Node DNS resolver crashes like `getaddrinfo EAI_AGAIN base`.
 */
export function isValidPostgresConnectionString(connStr: string | undefined): boolean {
  if (!connStr || typeof connStr !== "string") return false;
  const trimmed = connStr.trim();
  if (trimmed.length < 12) return false;

  if (trimmed.startsWith("postgres://") || trimmed.startsWith("postgresql://")) {
    try {
      const parsed = new URL(trimmed);
      const host = (parsed.hostname || "").trim().toLowerCase();
      // Valid hostname must exist, not be dummy artifacts like "base", and have valid length
      if (!host || host === "base" || host.length < 3) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  // Libpq format check: e.g. "host=... dbname=..."
  if (trimmed.includes("host=") && trimmed.includes("dbname=")) {
    const hostMatch = trimmed.match(/host=([^\s;]+)/i);
    if (hostMatch && hostMatch[1]) {
      const host = hostMatch[1].trim().toLowerCase();
      if (host !== "base" && host.length >= 3) {
        return true;
      }
    }
  }

  return false;
}

let pool: pg.Pool | null = null;
let isDbHealthy = false;
let dbInitAttempted = false;
let dbLastError: string | null = null;

export function isDatabaseConnected(): boolean {
  return Boolean(pool && isDbHealthy);
}

export function getDatabaseStatus(): {
  type: string;
  connected: boolean;
  status: string;
  error?: string | null;
} {
  const connStr = process.env.PG_CONNECTION_STRING;
  if (!connStr || connStr.trim().length === 0) {
    return {
      type: "In-Memory Store",
      connected: false,
      status: "unconfigured (in-memory mode)",
      error: null,
    };
  }

  if (!isValidPostgresConnectionString(connStr)) {
    return {
      type: "In-Memory Store",
      connected: false,
      status: "invalid_connection_string (falling back to in-memory)",
      error: "PG_CONNECTION_STRING is not a valid PostgreSQL URI format",
    };
  }

  return {
    type: "PostgreSQL",
    connected: isDbHealthy,
    status: isDbHealthy ? "connected" : "disconnected (in-memory fallback)",
    error: dbLastError,
  };
}

export function getDbPool(): pg.Pool | null {
  const connStr = process.env.PG_CONNECTION_STRING;
  if (!isValidPostgresConnectionString(connStr)) {
    return null;
  }

  if (pool) {
    return isDbHealthy ? pool : null;
  }

  if (dbInitAttempted && !isDbHealthy) {
    return null;
  }

  try {
    dbInitAttempted = true;
    const sanitizedConnStr = connStr!.trim();
    const sslDisabled = sanitizedConnStr.includes("sslmode=disable");

    pool = new pg.Pool({
      connectionString: sanitizedConnStr,
      ssl: sslDisabled ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 4000,
      idleTimeoutMillis: 30000,
    });

    // Handle background idle client errors to prevent uncaught process errors
    pool.on("error", (err: any) => {
      isDbHealthy = false;
      dbLastError = err.message;
      console.warn(`[DATABASE] Background pool client error: ${err.message}`);
    });

    // Test connection and bootstrap schema asynchronously
    pool
      .query("SELECT 1")
      .then(() => {
        isDbHealthy = true;
        dbLastError = null;
        console.log("[DATABASE] PostgreSQL connection established successfully.");
        return pool!.query(`
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
        `);
      })
      .then(() => {
        console.log("[DATABASE] PostgreSQL schema verified successfully.");
      })
      .catch((err: any) => {
        isDbHealthy = false;
        dbLastError = err.message;
        console.warn(
          `[DATABASE] PostgreSQL connection check failed (${err.message}). Resiliently using In-Memory storage.`
        );
      });

    return pool;
  } catch (err: any) {
    isDbHealthy = false;
    dbLastError = err.message;
    console.warn(`[DATABASE] Pool creation error: ${err.message}`);
    return null;
  }
}

/**
 * Executes a query with automatic fallback to in-memory mode if DB is disconnected.
 */
export async function safeDbQuery<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[] | null> {
  const p = getDbPool();
  if (!p) {
    return null;
  }

  try {
    const result = await p.query(sql, params);
    return result.rows as T[];
  } catch (err: any) {
    isDbHealthy = false;
    dbLastError = err.message;
    console.warn(`[DATABASE] Query failed (${err.message}). Falling back to in-memory mode.`);
    return null;
  }
}

// Initial bootstrap check on load
getDbPool();
