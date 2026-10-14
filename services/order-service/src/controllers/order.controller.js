// Phase 4: Write your Order controller logic here

const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../services/order.service");

// Create a new order
const createOrderController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const order = await createOrder(req.user.id, token);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    return res.status(error.response?.status || error.statusCode || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to create order",
    });
  }
};

// Get all orders belonging to the logged-in user
const getUserOrdersController = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.id);

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
    });
  }
};

// Get one order belonging to the logged-in user
const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id, req.user.id);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Get order error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve order",
    });
  }
};

module.exports = {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
};
