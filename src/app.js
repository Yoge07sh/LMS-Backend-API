const express = require('express')
const app = express();
const userRoute = require('./routes/userRoute')
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(userRoute);
module.exports = app;