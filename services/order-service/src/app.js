const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Order Service is running",
  });
});

app.use("/orders", orderRoutes);

module.exports = app;
