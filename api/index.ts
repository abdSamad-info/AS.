import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Database setup
let pool: pg.Pool | null = null;
if (process.env.PG_CONNECTION_STRING) {
  pool = new pg.Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false } // Required for some hosted PG instances like Neon/Vercel
  });
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
      console.log("Mock contact submission (Vercel):", { name, email, message });
      res.json({ 
        success: true, 
        message: "Message received! (Demo mode: Submission logged to server console)" 
      });
    }
  } catch (error: any) {
    console.error("Contact API error:", error);
    res.status(500).json({ error: "Failed to save message. Please try again later." });
  }
});

// For Vercel, we export the app
export default app;
