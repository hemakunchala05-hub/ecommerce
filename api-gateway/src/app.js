
const express = require("express");

const userRoutes = require("./routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const notificationRoutes = require("./routes/notification.routes");


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/notifications", notificationRoutes);
// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Gateway is running",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
