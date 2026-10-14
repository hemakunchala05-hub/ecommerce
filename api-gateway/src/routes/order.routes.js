
const express = require("express");
const axios = require("axios");

const router = express.Router();

const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:5005";

// Create an order
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/orders`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json(
      error.response?.data || {
        success: false,
        message: "Order Service is unavailable",
      }
    );
  }
});

// Get all orders belonging to the authenticated user
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/orders`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json(
      error.response?.data || {
        success: false,
        message: "Order Service is unavailable",
      }
    );
  }
});

// Get a specific order
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/orders/${req.params.id}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json(
      error.response?.data || {
        success: false,
        message: "Order Service is unavailable",
      }
    );
  }
});

module.exports = router;
