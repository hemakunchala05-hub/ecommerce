const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const cartRoutes = require("./routes/cart.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cart Service is running",
  });
});

// Cart routes
app.use("/cart", cartRoutes);

module.exports = app;