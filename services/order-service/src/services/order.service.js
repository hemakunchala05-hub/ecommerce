// Phase 4: Write your Order business services (e.g. inter-service calls to Cart & Product services) here
const axios = require("axios");
const Order = require("../models/order.model");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Create an order from the user's cart
const createOrder = async (userId, token) => {
  const cartResponse = await axios.get(
    `${process.env.CART_SERVICE_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const cart = cartResponse.data.cart;

  if (!cart || !cart.items || cart.items.length === 0) {
    throw createError("Your cart is empty", 400);
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cart.items) {
    const productResponse = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/products/${item.productId}`
    );

    const product = productResponse.data.data;

    if (!product) {
      throw createError(
        `Product ${item.productId} was not found`,
        404
      );
    }

    if (item.quantity > product.stock) {
      throw createError(
        `Insufficient stock for ${product.pname}`,
        400
      );
    }

    orderItems.push({
      productId: product._id,
      pname: product.pname,
      quantity: item.quantity,
      price: product.price,
    });

    totalAmount += product.price * item.quantity;
  }

  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    status: "pending",
  });

  // Clear the cart only after the order has been created
  await axios.delete(
    `${process.env.CART_SERVICE_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return order;
};

// Get all orders belonging to the logged-in user
const getUserOrders = async (userId) => {
  return Order.find({ userId }).sort({ createdAt: -1 });
};

// Get one order, only if it belongs to the user
const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order) {
    throw createError("Order not found", 404);
  }

  return order;
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
};