const express = require('express')
const app = express();
app.use(express.json());

const userRoute = require('./routes/userRoute')

app.use('/api/auth', userRoute);
module.exports = app;