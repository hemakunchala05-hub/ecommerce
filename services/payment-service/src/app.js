
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const paymentRoutes = require("./routes/payment.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment Service is running",
  });
});

// Routes
app.use("/payments", paymentRoutes);

module.exports = app;
