const logger = {
  info: (msg) => console.log(`[INFO] [ORDER-SERVICE] ${msg}`),
  error: (msg) => console.error(`[ERROR] [ORDER-SERVICE] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [ORDER-SERVICE] ${msg}`)
};

module.exports = logger;
