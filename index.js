require("dotenv").config();
let express = require("express");
let app = express();
app.listen(process.env.port, () => {
  console.log("server up and running...");
});
app.get("/", (req, res) => {
  res.send("Test");
});
