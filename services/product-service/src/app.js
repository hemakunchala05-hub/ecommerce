

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/product.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Service is running",
  });
});

// Product routes
app.use("/products", productRoutes);
app.use("/internal/inventory", inventoryRoutes);
module.exports = app;
