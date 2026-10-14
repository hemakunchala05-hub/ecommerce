
const mongoose = require("mongoose");

const reservationItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const stockReservationSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
    },

    items: {
      type: [reservationItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "A reservation must contain at least one item",
      },
    },

    status: {
      type: String,
      enum: ["reserved", "committed", "released"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StockReservation",
  stockReservationSchema
);
