// Phase 6: Define your Notification routes here

const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  sendNotificationController,
  getUserNotificationsController,
  getNotificationByIdController,
} = require("../controllers/notification.controller");

// Send a notification
router.post("/", authenticateUser, sendNotificationController);

// Get notification history
router.get("/", authenticateUser, getUserNotificationsController);

// Get a specific notification
router.get("/:id", authenticateUser, getNotificationByIdController);

module.exports = router;
