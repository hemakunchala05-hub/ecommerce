// Phase 2: Define your Product routes here

const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// GET all products
router.get("/", productController.getAllProducts);

// GET products by type, e.g. /products?type=shoes
router.get("/type", productController.getProductByType);

// GET a single product by ID
router.get("/:id", productController.getProductById);

// CREATE a new product
router.post("/", productController.createProduct);

// UPDATE a product
router.put("/:id", productController.updateProduct);

// DELETE a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
