
const express = require("express");
const axios = require("axios");

const router = express.Router();

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5007";

// Send a notification
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${NOTIFICATION_SERVICE_URL}/notifications`,
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
        message: "Notification Service is unavailable",
      }
    );
  }
});

// Get notification history
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${NOTIFICATION_SERVICE_URL}/notifications`,
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
        message: "Notification Service is unavailable",
      }
    );
  }
});

// Get a specific notification
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${NOTIFICATION_SERVICE_URL}/notifications/${req.params.id}`,
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
        message: "Notification Service is unavailable",
      }
    );
  }
});

module.exports = router;
