const express = require('express');
const route = express.Router();
const userController = require('../controllers/userControlller');

route.post('/register', (req, res) => {
    userController.register(req, res);
})


module.exports = route;