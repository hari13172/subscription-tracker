import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res
          .status(429)
          .json({ error: "Rate limit exceeded, please try again later." });
      if (decision.reason.isBot())
        return res
          .status(403)
          .json({ error: "Access denied, bot traffic is not allowed." });

      return res
        .status(403)
        .json({ error: "Access denied, your request has been blocked." });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
