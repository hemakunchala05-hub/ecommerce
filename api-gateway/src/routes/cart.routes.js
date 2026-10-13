const express = require("express");
const axios = require("axios");

const router = express.Router();

// Get user's cart
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.CART_SERVICE_URL}/cart`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Cart service is unavailable",
    });
  }
});

// Add item to cart
router.post("/items", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.CART_SERVICE_URL}/cart/items`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Cart service is unavailable",
    });
  }
});

// Update cart item quantity
router.put("/items", async (req, res) => {
  try {
    const response = await axios.put(
      `${process.env.CART_SERVICE_URL}/cart/items`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Cart service is unavailable",
    });
  }
});

// Remove item from cart
router.delete("/items/:productId", async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.CART_SERVICE_URL}/cart/items/${req.params.productId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Cart service is unavailable",
    });
  }
});

// Clear user's cart
router.delete("/", async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.CART_SERVICE_URL}/cart`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Cart service is unavailable",
    });
  }
});

module.exports = router;