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

let pool: pg.Pool | null = null;

export function getDbPool(): pg.Pool | null {
  if (!pool && process.env.PG_CONNECTION_STRING) {
    try {
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
        .then(() => console.log("[DATABASE] PostgreSQL schema verified successfully"))
        .catch((err) => console.error("[DATABASE] PostgreSQL init error:", err.message));
    } catch (err: any) {
      console.error("[DATABASE] Pool creation error:", err.message);
    }
  }
  return pool;
}

// Initialize on startup if connection string exists
getDbPool();
