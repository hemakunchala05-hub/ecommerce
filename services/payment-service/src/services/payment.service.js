// Phase 5: Write your Payment gateway integration service (e.g. Stripe, PayPal, Razorpay) here

const axios = require("axios");
const Payment = require("../models/payment.model");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:5005";

// Initiate a payment for an order
const initiatePayment = async (orderId, userId, token, method) => {
  if (!["card", "upi", "netbanking", "cod"].includes(method)) {
    throw createError("Invalid payment method", 400);
  }

  let response;

  try {
    response = await axios.get(
      `${ORDER_SERVICE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (error.response?.status) {
      throw createError(
        error.response.data?.message || "Unable to retrieve order",
        error.response.status
      );
    }

    throw createError("Order Service is unavailable", 503);
  }

  const order = response.data.data;

  if (!order || String(order.userId) !== String(userId)) {
    throw createError("Order not found", 404);
  }

  if (order.status === "cancelled") {
    throw createError("Cannot pay for a cancelled order", 400);
  }

  const existingPayment = await Payment.findOne({
    orderId: order._id,
    userId,
    status: { $in: ["pending", "success"] },
  });

  if (existingPayment) {
    throw createError(
      "A pending or successful payment already exists for this order",
      409
    );
  }

  const payment = await Payment.create({
    orderId: order._id,
    userId,
    amount: order.totalAmount,
    method,
    status: "pending",
  });

  return payment;
};

// Retrieve the logged-in user's payments
const getUserPayments = async (userId) => {
  return Payment.find({ userId }).sort({ createdAt: -1 });
};

// Retrieve a specific payment belonging to the logged-in user
const getPaymentById = async (paymentId, userId) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    userId,
  });

  if (!payment) {
    throw createError("Payment not found", 404);
  }

  return payment;
};

module.exports = {
  initiatePayment,
  getUserPayments,
  getPaymentById,
};
