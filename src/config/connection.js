const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/lms_db");
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;