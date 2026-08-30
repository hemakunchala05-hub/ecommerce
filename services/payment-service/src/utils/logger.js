const logger = {
  info: (msg) => console.log(`[INFO] [PAYMENT-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [PAYMENT-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [PAYMENT-SERVICE] ${msg}`)
};

module.exports = logger;
