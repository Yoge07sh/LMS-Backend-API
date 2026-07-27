const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validationMiddleware = require("../middleware/validationMiddleware");

const {
    registerValidator,
    loginValidator,
    forgetPasswordValidator,
    resetPasswordValidator
} = require("../validators/authValidator");

// Register
router.post(
    "/register",
    registerValidator,
    validationMiddleware,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidator,
    validationMiddleware,
    authController.login
);

// Forgot Password
router.post(
    "/forgot-password",
    forgetPasswordValidator,
    validationMiddleware,
    authController.forgetPassword
);

// Reset Password
router.post(
    "/reset-password/:token",
    resetPasswordValidator,
    validationMiddleware,
    authController.resetPassword
);

module.exports = router;