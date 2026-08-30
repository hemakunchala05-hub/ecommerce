// Phase 3: Write your Cart business services (e.g. inter-service HTTP calls to Product Service) here
const Cart = require("../models/cart.model");

const getCart = async (userId) => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: []
        });
    }

    return cart;
};

const addItemToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({
            userId,
            items: [
                {
                    productId,
                    quantity
                }
            ]
        });

        return cart;
    }

    const existingItem = cart.items.find(
        item => item.productId === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity
        });
    }

    await cart.save();

    return cart;
};

module.exports = {
    getCart,
    addItemToCart
};