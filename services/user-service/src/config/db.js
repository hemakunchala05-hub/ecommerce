const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `User Service MongoDB connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "User Service MongoDB connection failed:",
      error.message
    );

    throw error;
  }
};

module.exports = connectDB;