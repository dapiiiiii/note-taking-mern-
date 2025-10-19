import express from 'express';
import notesRoute from './src/routes/notesRoute.js';
import connectDB from './src/controllers/config/db.js';
import dotenv from 'dotenv';
import ratelimit from './src/controllers/config/upstash.js';
import ratelimiter from './src/middleware/rateLimiter.js'; // ✅ lowercase
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// ✅ CORS must come before routes and rate limiters
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Parse JSON
app.use(express.json());

// ✅ Apply rate limiter (after JSON but before routes)
app.use(ratelimiter);

// ✅ Connect to MongoDB first, then start server
connectDB().then(() => {
  // Use routes
  app.use('/api/notes', notesRoute);

  // Root route
  app.get('/', (req, res) => {
    res.send('Welcome to Notes API!');
  });

  // Start server
  app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to database:", err);
});
