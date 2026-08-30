const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    console.warn('[MongoDB Atlas Notice] If connection failed, please ensure your IP address is whitelisted in MongoDB Atlas (Network Access -> Add IP Address / Allow Access from Anywhere 0.0.0.0/0).');
  }
};

module.exports = connectDB;