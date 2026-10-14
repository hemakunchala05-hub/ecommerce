
const express = require("express");
const router = express.Router();

const authenticateInternalService = require("../middlewares/internal-auth.middleware");
const productController = require("../controllers/product.controller");

router.post(
  "/reserve",
  authenticateInternalService,
  productController.reserveStock
);

router.post(
  "/release",
  authenticateInternalService,
  productController.releaseStock
);

module.exports = router;
