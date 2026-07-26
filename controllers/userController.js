const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const user = await User.findOne({ email: req.body.email });
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

module.exports = {
    register,
    getRegister,
    login
}