const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const register = async (req, res) => {

    try {

        const email = req.body.email.toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email is already registered");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            ...req.body,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            "mysecretKey",
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect("/profile");

    } catch (error) {
        console.log(error);
    }

};

const login = async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email.toLowerCase()
        });

        if (!user) {
            return res.send("User does not exist");
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.send("Invalid password");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            "mysecretKey",
            {
                expiresIn: "10m"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
        });

        res.redirect("/profile");

    } catch (error) {
        console.log(error);
    }

};

const forgetPassword = async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email.toLowerCase()
        });

        if (!user) {
            return res.send("User does not exist");
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const message = `
You requested a password reset.

${resetUrl}

Expires in 15 minutes.
`;

        await sendEmail({
            email: user.email,
            subject: "Password Reset",
            message
        });

        return res.json({
            success: true,
            message: "Reset link sent successfully."
        });

    } catch (error) {

        console.log(error);

    }

};

const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid reset token"
        });
    }

    if (user.resetPasswordExpire < Date.now()) {

        return res.status(400).json({
            success: false,
            message: "Token expired"
        });

    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json({
        success: true,
        message: "Password reset successfully"
    });

};

module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword
};