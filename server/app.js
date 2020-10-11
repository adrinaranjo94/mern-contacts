const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Initialize bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json();
// Initialize router
app.use("/api", routes);

module.exports = app;
