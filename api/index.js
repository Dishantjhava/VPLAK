import mongoose from 'mongoose';
import app from '../server.js';

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://dishantjava06690_db_user:99Iksg52tqVsYtwy@vplak.nrisjs9.mongodb.net/vplak?retryWrites=true&w=majority&appName=VPLAK';

let isConnected = false;

/**
 * Serverless entry point for Vercel
 * Connects to MongoDB Atlas and delegates HTTP handling to the Express application
 */
export default async function handler(req, res) {
  if (!isConnected || mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI);
      isConnected = true;
    } catch (err) {
      console.error('[Vercel Serverless] MongoDB connection failed:', err);
    }
  }

  return app(req, res);
}
