require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');



const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 5001, () => {
      console.log(`User Service running on port ${process.env.PORT || 5001}`);
    });
  } catch (error) {
    console.error("User Service startup failed:", error.message);
    process.exit(1);
  }
};

startServer();



