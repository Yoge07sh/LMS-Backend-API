const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const getRegister = (req, res) => {
    res.send('Welcome to Register Page');
}

const register = async (req, res) => {

    try {
        console.log(req.body);
        const email = req.body.email.toLowerCase();
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
        if (existingUser) {
            return res.send('email is already registered');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = {
            ...req.body,
            password: hashedPassword

        }
        const user = new User(userData);
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            "mysecretKey",
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!user) {
            return res.send('no user exist');
        }
        const isMatch = bcrypt.compare(user.password, req.body.password);
        if (isMatch) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role
                },
                "mysecretKey",
                {
                    expiresIn: "10min"
                }
            )
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000
            })

            res.send('welcome to HomePage');
        } else {
            res.send('invalid password');
        }
    } catch (err) {
        console.log(err);
    }
}

const forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!user) {
            return res.send('user is not exist');
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();
        const resetUrl = `http://localhost:3000/user/reset-password/${resetToken}`;
        const message = `
You requested a password reset.

Click the link below to reset your password:

${resetUrl}

This link will expire in 15 minutes.

If you did not request this, please ignore this email.
`;
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message: message
        });
        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully."
        });
    } catch (err) {
        res.send(err);
    }
}


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
            message: "Reset token has expired"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password reset successfully"
    });

};


module.exports = {
    register,
    getRegister,
    login,
    forgetPassword,
    resetPassword
}