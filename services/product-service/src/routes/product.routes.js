const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authenticateUser = require("../middlewares/auth.middleware");
const authorizeAdmin = require("../middlewares/admin.middleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/type", productController.getProductByType);
router.get("/:id", productController.getProductById);

// Admin-only routes
router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  productController.createProduct
);

router.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  productController.deleteProduct
);

module.exports = router;
