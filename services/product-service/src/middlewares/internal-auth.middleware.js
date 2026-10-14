
const crypto = require("crypto");

const authenticateInternalService = (req, res, next) => {
  const expectedSecret = process.env.INTERNAL_SERVICE_SECRET;
  const providedSecret = req.headers["x-internal-service-secret"];

  if (!expectedSecret || !providedSecret) {
    return res.status(401).json({
      success: false,
      message: "Internal service authentication required",
    });
  }

  const expectedBuffer = Buffer.from(expectedSecret);
  const providedBuffer = Buffer.from(providedSecret);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return res.status(403).json({
      success: false,
      message: "Invalid internal service credentials",
    });
  }

  next();
};

module.exports = authenticateInternalService;
