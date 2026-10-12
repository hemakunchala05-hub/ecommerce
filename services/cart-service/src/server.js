const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Cart Service running on port ${PORT}`);
  });
};

startServer();