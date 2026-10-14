// Phase 6: Write your Notification Mongoose Schema and Model here

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    recipient: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: [
        "order_confirmation",
        "payment_update",
        "order_status_update",
      ],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = Notification;
