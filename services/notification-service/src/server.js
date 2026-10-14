
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5007;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Notification Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Notification Service startup failed:",
      error.message
    );
    process.exit(1);
  }
};

startServer();
