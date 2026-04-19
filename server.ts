import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Serve static files from public folder (IMPORTANT: This must be high priority for images)
  app.use(express.static(path.join(__dirname, 'public')));

  // 2. Database setup
  let pool: pg.Pool | null = null;
  if (process.env.PG_CONNECTION_STRING) {
    pool = new pg.Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
    
    // Initialize table if it doesn't exist (only if connection works)
    pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).catch(err => console.error("Postgres init error:", err.message));
  }

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      if (pool) {
        await pool.query(
          "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
          [name, email, message]
        );
        res.json({ success: true, message: "Message sent successfully!" });
      } else {
        // Mock success if no DB is connected for demo purposes
        console.log("Mock contact submission:", { name, email, message });
        res.json({ 
          success: true, 
          message: "Message received! (Demo mode: Submission logged to server console as PG_CONNECTION_STRING is missing)" 
        });
      }
    } catch (error: any) {
      console.error("Contact API error:", error);
      res.status(500).json({ error: "Failed to save message. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
