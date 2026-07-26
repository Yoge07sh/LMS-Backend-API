const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.get('/registerpage', (req, res) => {
    userController.getRegister(req, res);
})

route.post('/register', (req, res) => {
    userController.register(req, res);
})

route.post('/login', (req, res) => {
    userController.login(req, res);
})

route.post('/forget-password', (req, res) => {
    userController.forgetPassword(req, res);
})

route.post("/reset-password/:token", (req, res) => {
    userController.resetPassword(req, res)

});

module.exports = route;