const logger = {
  info: (msg) => console.log(`[INFO] [USER-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [USER-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [USER-SERVICE] ${msg}`)
};

module.exports = logger;
