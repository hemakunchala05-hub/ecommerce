const logger = {
  info: (msg) => console.log(`[INFO] [NOTIFICATION-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [NOTIFICATION-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [NOTIFICATION-SERVICE] ${msg}`)
};

module.exports = logger;
