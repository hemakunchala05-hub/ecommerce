
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const inventoryRoutes = require("./routes/inventory.routes");

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Product Service:", error.message);
    process.exit(1);
  }
};

startServer();

