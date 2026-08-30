// Phase 3: Write your Cart Mongoose Schema and Model here
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },

        items: [cartItemSchema]
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
