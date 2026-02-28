import rateLimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || req.headers["x-forwarded-for"] || "anonymous";
    console.log("identifier", identifier);
    const { success } = await rateLimit.limit(identifier);

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }

    next();
  } catch (error) {
    console.error("Error in rate limiter", error);
    next(error);
  }
};

export default rateLimiter;
