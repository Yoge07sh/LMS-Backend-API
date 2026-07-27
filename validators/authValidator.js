const { body } = require("express-validator");

const registerValidator = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters")
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters")
];
const forgetPasswordValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
];

const resetPasswordValidator = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long")
];
module.exports = {
    registerValidator,
    loginValidator,
    forgetPasswordValidator,
    resetPasswordValidator
};