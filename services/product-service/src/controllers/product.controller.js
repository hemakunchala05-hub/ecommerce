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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByType,
  updateProduct,
  deleteProduct,
};
