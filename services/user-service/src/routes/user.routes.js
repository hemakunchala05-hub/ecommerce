// Phase 1: Define your User routes h// Phase 1: Define your User routes here


const express = require("express");


const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authenticateUser = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authenticateUser, updateProfile);

module.exports = router;