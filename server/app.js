// DOTENV CONF
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
// END DOTENV CONF
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use("/api", routes);

module.exports = app;
