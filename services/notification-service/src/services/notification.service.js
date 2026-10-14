// Phase 6: Write your Email/SMS sending service (e.g. Nodemailer, Twilio, SendGrid) here

const nodemailer = require("nodemailer");
const Notification = require("../models/notification.model");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw createError("Email service is not configured", 503);
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Create a notification and send its email
const sendNotification = async ({
  userId,
  recipient,
  type,
  subject,
  message,
}) => {
  const notification = await Notification.create({
    userId,
    recipient,
    type,
    subject,
    message,
    status: "pending",
  });

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      text: message,
    });

    notification.status = "sent";
    notification.sentAt = new Date();
    await notification.save();

    return notification;
  } catch (error) {
    notification.status = "failed";
    await notification.save();

    throw createError(
      error.statusCode
        ? error.message
        : "Failed to send notification email",
      error.statusCode || 502
    );
  }
};

// Retrieve notification history for a user
const getUserNotifications = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

// Retrieve one notification belonging to a user
const getNotificationById = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw createError("Notification not found", 404);
  }

  return notification;
};

module.exports = {
  sendNotification,
  getUserNotifications,
  getNotificationById,
};
