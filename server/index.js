const app = require("./app");

mongoose.connect(process.env.CONNECTION_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server starts in port:", PORT);
  });
});
