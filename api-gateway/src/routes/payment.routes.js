
const express = require("express");
const axios = require("axios");

const router = express.Router();

const PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL || "http://localhost:5006";

// Initiate payment
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${PAYMENT_SERVICE_URL}/payments`,
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
        message: "Payment Service is unavailable",
      }
    );
  }
});

// Get payment history
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${PAYMENT_SERVICE_URL}/payments`,
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
        message: "Payment Service is unavailable",
      }
    );
  }
});

// Get a specific payment
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${PAYMENT_SERVICE_URL}/payments/${req.params.id}`,
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
        message: "Payment Service is unavailable",
      }
    );
  }
});

module.exports = router;
