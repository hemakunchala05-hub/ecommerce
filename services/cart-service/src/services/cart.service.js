const axios = require("axios");
const mongoose = require("mongoose");
const Cart = require("../models/cart.model");

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:5004";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Fetch and validate product using Product Service
const getValidatedProduct = async (productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createError("Invalid product ID", 400);
  }

  let response;

  try {
    response = await axios.get(
      `${PRODUCT_SERVICE_URL}/products/${productId}`,
      { timeout: 5000 }
    );
  } catch (error) {
    if (error.response?.status === 404) {
      throw createError("Product not found", 404);
    }

    if (error.response) {
      throw createError(
        error.response.data?.message || "Product validation failed",
        error.response.status
      );
    }

    throw createError("Product service is unavailable", 503);
  }

  // Support common response shapes from the Product Service
  const product =
    response.data?.product ||
    response.data?.data ||
    response.data;

  if (!product || !product._id) {
    throw createError("Invalid response from Product Service", 502);
  }

  if (
    !Number.isFinite(product.price) ||
    !Number.isInteger(product.stock) ||
    product.stock < 0
  ) {
    throw createError("Product has invalid price or stock data", 502);
  }

  return product;
};

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
const addToCart = async (userId, productId, quantity) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw createError("Quantity must be a positive integer", 400);
  }

  const product = await getValidatedProduct(productId);

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === product._id.toString()
  );

  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    throw createError(
      `Only ${product.stock} units are currently available`,
      400
    );
  }

  if (existingItem) {
    existingItem.quantity = newQuantity;
    existingItem.price = product.price;
  } else {
    cart.items.push({
      productId: product._id,
      quantity,
      price: product.price,
    });
  }

  await cart.save();

  return cart;
};

// Update item quantity
const updateCartItem = async (userId, productId, quantity) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw createError("Quantity must be a positive integer", 400);
  }

  const product = await getValidatedProduct(productId);
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw createError("Cart not found", 404);
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === product._id.toString()
  );

  if (!item) {
    throw createError("Product not found in cart", 404);
  }

  if (quantity > product.stock) {
    throw createError(
      `Only ${product.stock} units are currently available`,
      400
    );
  }

  item.quantity = quantity;
  item.price = product.price;

  await cart.save();

  return cart;
};

// Remove product from cart
const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw createError("Cart not found", 404);
  }

  const originalLength = cart.items.length;

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  if (cart.items.length === originalLength) {
    throw createError("Product not found in cart", 404);
  }

  await cart.save();

  return cart;
};

// Clear entire cart
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw createError("Cart not found", 404);
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