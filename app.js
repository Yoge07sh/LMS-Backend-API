const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Layouts
app.use(expressLayouts);
app.set("layout", "layouts/auth");

// Static Files
app.use(express.static(path.join(__dirname, "public")));
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const pageRoute = require("./routes/pageRoute");

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/", pageRoute);
module.exports = app;