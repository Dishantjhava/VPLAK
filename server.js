import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import orderRoutes from './backend/routes/orderRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Serve frontend build if dist folder exists (Single-Platform Unified Deployment)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Client-side SPA fallback for all non-API routes
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Database connection & server start
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[Database] Successfully connected to MongoDB at ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`[Server] VPLAK Unified Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Error] Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Start server locally or in standard container environment (Render/Railway/local)
if (!process.env.VERCEL) {
  startServer();
}

export default app;
