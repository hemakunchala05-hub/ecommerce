// Phase 5: Write your Payment controller logic here

const {
  initiatePayment,
  getUserPayments,
  getPaymentById,
} = require("../services/payment.service");

// Initiate a payment
const initiatePaymentController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const { orderId, method } = req.body;

    if (!orderId || !method) {
      return res.status(400).json({
        success: false,
        message: "Order ID and payment method are required",
      });
    }

    const payment = await initiatePayment(
      orderId,
      req.user.id,
      token,
      method
    );

    return res.status(201).json({
      success: true,
      message: "Payment initiated successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Initiate payment error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to initiate payment",
    });
  }
};

// Get all payments for the logged-in user
const getUserPaymentsController = async (req, res) => {
  try {
    const payments = await getUserPayments(req.user.id);

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("Get user payments error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve payments",
    });
  }
};

// Get a specific payment
const getPaymentByIdController = async (req, res) => {
  try {
    const payment = await getPaymentById(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Get payment error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve payment",
    });
  }
};

module.exports = {
  initiatePaymentController,
  getUserPaymentsController,
  getPaymentByIdController,
};
