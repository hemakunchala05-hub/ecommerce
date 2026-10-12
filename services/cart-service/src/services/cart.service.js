const Cart = require("../models/cart.model");

// Get user's cart
const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  return cart;
};

// Add product to cart
const addToCart = async (userId, productId, quantity, price) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [
        {
          productId,
          quantity,
          price,
        },
      ],
    });

    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price,
    });
  }

  await cart.save();

  return cart;
};

// Update item quantity
const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  if (!item) {
    throw new Error("Product not found in cart");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};

// Remove product from cart
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  await cart.save();

  return cart;
};

// Clear entire cart
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};