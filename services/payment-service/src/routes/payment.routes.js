// Phase 5: Define your Payment routes here

const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
  initiatePaymentController,
  getUserPaymentsController,
  getPaymentByIdController,
} = require("../controllers/payment.controller");

// Initiate a payment
router.post("/", authenticateUser, initiatePaymentController);

// Get all payments belonging to the logged-in user
router.get("/", authenticateUser, getUserPaymentsController);

// Get a specific payment
router.get("/:id", authenticateUser, getPaymentByIdController);

module.exports = router;
