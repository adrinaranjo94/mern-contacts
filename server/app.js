const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Initialize bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Initialize router
app.use("/api", routes);

module.exports = app;
