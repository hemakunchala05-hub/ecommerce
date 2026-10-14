// Phase 5: Write your Payment Mongoose Schema and Model here

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    method: {
      type: String,
      enum: ["card", "upi", "netbanking", "cod"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },

    transactionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
