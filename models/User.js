const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },
    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire: {
        type: Date
    }
},
    {
        timestamps: true
    });

const User = mongoose.model("User", userSchema);

module.exports = User;