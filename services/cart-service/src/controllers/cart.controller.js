// Phase 3: Write your Cart controller logic here
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../services/cart.service");

// Get cart
const getCartController = async (req, res) => {
  try {
    const cart = await getCart(req.user.id);

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
  success: false,
  message: error.message,
});
  }
};

// Add product to cart
const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required",
      });
    }

    const cart = await addToCart(
      req.user.id,
      productId,
      quantity
    );

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update cart item
const updateCartItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required",
      });
    }

    const cart = await updateCartItem(
      req.user.id,
      productId,
      quantity
    );

   res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
   return res.status(error.statusCode || 500).json({
  success: false,
  message: error.message,
});
  }
};

// Remove product from cart
const removeFromCartController = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await removeFromCart(
      req.user.id,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
  success: false,
  message: error.message,
});
  }
};

// Clear cart
const clearCartController = async (req, res) => {
  try {
    const cart = await clearCart(req.user.id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
   return res.status(error.statusCode || 500).json({
  success: false,
  message: error.message,
});
  }
};

module.exports = {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
};