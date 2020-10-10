// DOTENV CONF
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
// END DOTENV CONF
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_URI).then(() => {
  const app = express();

  app.listen(PORT, () => {
    console.log("Server starts in port:", PORT);
  });
});
