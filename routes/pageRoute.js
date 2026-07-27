const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Login"
    });
});

router.get("/register", (req, res) => {
    res.render("auth/register", {
        title: "Register"
    });
});

router.get("/forgot-password", (req, res) => {
    res.render("auth/forgot-password", {
        title: "Forgot Password"
    });
});

router.get("/reset-password/:token", (req, res) => {
    res.render("auth/reset-password", {
        title: "Reset Password",
        token: req.params.token
    });
});

module.exports = router;