
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notificationRoutes = require("./routes/notification.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notification Service is running",
  });
});

// Routes
app.use("/notifications", notificationRoutes);

module.exports = app;

