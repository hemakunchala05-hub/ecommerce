// Phase 6: Write your Notification controller logic here

const {
  sendNotification,
  getUserNotifications,
  getNotificationById,
} = require("../services/notification.service");

// Send a notification
const sendNotificationController = async (req, res) => {
  try {
    const { recipient, type, subject, message } = req.body;

    if (!recipient || !type || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Recipient, type, subject, and message are required",
      });
    }

    const validTypes = [
      "order_confirmation",
      "payment_update",
      "order_status_update",
    ];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification type",
      });
    }

    const notification = await sendNotification({
      userId: req.user.id,
      recipient,
      type,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Send notification error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to send notification",
    });
  }
};

// Get the logged-in user's notification history
const getUserNotificationsController = async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.user.id);

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notifications",
    });
  }
};

// Get one notification belonging to the logged-in user
const getNotificationByIdController = async (req, res) => {
  try {
    const notification = await getNotificationById(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Get notification error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to retrieve notification",
    });
  }
};

module.exports = {
  sendNotificationController,
  getUserNotificationsController,
  getNotificationByIdController,
};
