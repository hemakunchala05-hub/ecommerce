
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5006;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Payment Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Payment Service startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
