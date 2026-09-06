import { createExpressApp } from "../server/app.js";

// Initialize the unified Express application
const app = createExpressApp();

// Export as default for Vercel Serverless Function runtime
export default app;
