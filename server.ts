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

  // 🔥 1. Specific route for images must be FIRST to prevent catch-all conflicts
  app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'public', 'images', filename);
    
    // Set explicit headers to resolve 206 status issues on Vercel
    res.set({
      'Content-Type': filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? 'image/jpeg' : 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Accept-Ranges': 'none'
    });

    res.sendFile(filepath, (err) => {
      if (err) {
        console.error(`[ERROR] Image not found: ${filename} at ${filepath}`);
        res.status(404).send('Image not found');
      }
    });
  });

  // 2. Serve static files from public folder
  app.use(express.static(path.join(__dirname, 'public')));

  // 3. Database setup (Optional)
  let pool: pg.Pool | null = null;
  if (process.env.PG_CONNECTION_STRING) {
    pool = new pg.Pool({
      connectionString: process.env.PG_CONNECTION_STRING,
    });
    
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

  // 4. API Routes
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
        console.log("Mock contact submission:", { name, email, message });
        res.json({ 
          success: true, 
          message: "Message received! (Demo mode)" 
        });
      }
    } catch (error: any) {
      console.error("Contact API error:", error);
      res.status(500).json({ error: "Failed to save message." });
    }
  });

  // 5. Development vs Production middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Serve production assets from dist
    app.use(express.static(distPath, {
      maxAge: '31536000',
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
          res.set('Cache-Control', 'no-cache');
        }
      }
    }));
  }

  // 6. Catch-all route MUST be LAST
  app.get("*", (req, res) => {
    const indexPath = path.join(
      process.cwd(), 
      process.env.NODE_ENV === "production" ? "dist" : ".",
      "index.html"
    );
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).send('Application root not found');
      }
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SUCCESS] Server running on http://localhost:${PORT}`);
    console.log(`[INFO] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
