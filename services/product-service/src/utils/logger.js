const logger = {
  info: (msg) => console.log(`[INFO] [PRODUCT-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [PRODUCT-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [PRODUCT-SERVICE] ${msg}`)
};

module.exports = logger;
