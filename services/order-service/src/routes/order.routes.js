// Phase 4: Define your Order routes here
const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
} = require("../controllers/order.controller");

// Create an order from the user's cart
router.post("/", authenticateUser, createOrderController);

// Get the logged-in user's orders
router.get("/", authenticateUser, getUserOrdersController);

// Get one order belonging to the logged-in user
router.get("/:id", authenticateUser, getOrderByIdController);

module.exports = router;