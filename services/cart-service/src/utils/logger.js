const logger = {
  info: (msg) => console.log(`[INFO] [CART-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [CART-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [CART-SERVICE] ${msg}`)
};

module.exports = logger;
