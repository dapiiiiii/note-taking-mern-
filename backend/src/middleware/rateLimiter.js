// Development-safe in-memory rate limiter

let inMemoryStore = {};

const ratelimiter = async (req, res, next) => {
  try {
    // Simple in-memory limit: 5 requests per minute per IP
    const ip = req.ip || "local-dev";
    const now = Date.now();
    const windowTime = 60 * 1000; // 1 minute
    const maxRequests = 5;

    if (!inMemoryStore[ip]) inMemoryStore[ip] = [];

    // Remove timestamps older than windowTime
    inMemoryStore[ip] = inMemoryStore[ip].filter(ts => now - ts < windowTime);

    if (inMemoryStore[ip].length >= maxRequests) {
      return res.status(429).json({ message: "Too many requests" });
    }

    inMemoryStore[ip].push(now);

    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    next(); // allow request if something fails
  }
};

export default ratelimiter;
