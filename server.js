require("dotenv").config();

const app = require("./app");
const connectDB = require('./config/connection');
const PORT = 3000;


//connect database
connectDB();


//start the server
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});