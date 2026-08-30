const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_notification_db');
    console.log(`[NOTIFICATION-SERVICE] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[NOTIFICATION-SERVICE] DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
