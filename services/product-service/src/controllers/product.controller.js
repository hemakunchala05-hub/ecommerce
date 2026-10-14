// Phase 2: Write your Product controller logic here

const productService = require("../services/product.service");

// Create a product
const createProduct = async (req, res) => {
  try {
    const {
      pname,
      type,
      brand,
      description,
      price,
      stock,
      discount,
      imageUrl,
    } = req.body;

    const product = await productService.createProduct(
      pname,
      type,
      brand,
      description,
      price,
      stock,
      discount,
      imageUrl
    );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    const statusCode =
      error.message === "Product already exists" ? 409 :
      error.message === "Name, type and brand are required" ? 400 :
      error.pname === "ValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    const statusCode =
      error.message === "Invalid product ID" ? 400 :
      error.message === "Product not found" ? 404 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Get products by type
const getProductByType = async (req, res) => {
  try {
    const products = await productService.getProductByType(
      req.query.type
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    const statusCode =
      error.message === "Product type is required" ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    const statusCode =
      error.message === "Invalid product ID" ||
      error.message === "Invalid product update data" ||
      error.message === "Invalid or empty product update fields" ||
      error.message === "Name, type and brand cannot be empty" ? 400 :
      error.message === "Product not found" ? 404 :
      error.message.includes("same name, type and brand") ? 409 :
      error.pname === "ValidationError" ? 400 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    const statusCode =
      error.message === "Invalid product ID" ? 400 :
      error.message === "Product not found" ? 404 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};


const reserveStock = async (req, res) => {
  try {
    const { orderId, userId, items } = req.body;

    if (
      !orderId ||
      !userId ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Order ID, user ID, and items are required",
      });
    }

    const reservation = await productService.reserveStock(
      orderId,
      userId,
      items
    );

    return res.status(201).json({
      success: true,
      message: "Stock reserved successfully",
      data: reservation,
    });
  } catch (error) {
    const statusCode =
      error.message === "Reservation already exists for this order" ? 409 :
      error.message === "Insufficient stock" ||
      error.message.startsWith("Insufficient stock for") ? 409 :
      error.message === "Invalid product ID" ||
      error.message === "Quantity must be a positive integer" ||
      error.message === "Order ID, user ID, and items are required" ? 400 :
      error.message.includes("not found") ? 404 : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to reserve stock",
    });
  }
};

const releaseStock = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    if (!orderId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Order ID and user ID are required",
      });
    }

    const reservation = await productService.releaseStock(
      orderId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Stock released successfully",
      data: reservation,
    });
  } catch (error) {
    const statusCode =
      error.message === "Stock reservation not found" ? 404 :
      error.message === "Committed stock cannot be released" ? 409 :
      500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to release stock",
    });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByType,
  updateProduct,
  deleteProduct,
  reserveStock,
  releaseStock
};
