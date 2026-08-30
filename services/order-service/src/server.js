require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5004;

// Connect Database
connectDB();

app.listen(PORT, () => {
  logger.info(`🚀 Order Service running on port ${PORT}`);
});
