const express = require("express");
const axios = require("axios");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/products`,
      { params: req.query }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

// Get products by type
router.get("/type", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/products/type`,
      { params: req.query }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

// Get one product by ID
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/products`,
      req.body
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`,
      req.body
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.PRODUCT_SERVICE_URL}/products/${req.params.id}`
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(503).json({
      success: false,
      message: "Product service is unavailable",
    });
  }
});

module.exports = router;