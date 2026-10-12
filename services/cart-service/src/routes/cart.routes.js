// Phase 3: Define your Cart routes here
const express = require("express");

const {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} = require("../controllers/cart.controller");

const authenticateUser = require("../middlewares/auth.middleware");

const router = express.Router();

// Get user's cart
router.get("/", authenticateUser, getCartController);

// Add product to cart
router.post("/items", authenticateUser, addToCartController);

// Update product quantity
router.put("/items", authenticateUser, updateCartItemController);

// Remove product from cart
router.delete("/items/:productId", authenticateUser, removeFromCartController);

// Clear cart
router.delete("/", authenticateUser, clearCartController);

module.exports = router;