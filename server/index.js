const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server starts in port:", PORT);
    });
  });
