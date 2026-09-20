import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import orderRoutes from './backend/routes/orderRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vplak';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Database connection & server start
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[Database] Successfully connected to MongoDB at ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`[Server] VPLAK Backend Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Error] Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

startServer();

export default app;
