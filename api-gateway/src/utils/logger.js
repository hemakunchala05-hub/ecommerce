const winston = {
  info: (msg) => console.log(`[INFO] [API-GATEWAY] ${msg}`),
  error: (msg) => console.error(`[ERROR] [API-GATEWAY] ${msg}`),
  warn: (msg) => console.warn(`[WARN] [API-GATEWAY] ${msg}`)
};

module.exports = winston;
