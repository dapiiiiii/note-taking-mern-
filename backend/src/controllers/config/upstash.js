import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dovenv from "dotenv";

dovenv.config(); // MUST come before using process.env

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

export default ratelimit;