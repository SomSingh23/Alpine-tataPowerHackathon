require("dotenv").config();
let express = require("express");
let app = express();
app.listen(process.env.port, () => {
  console.log(`Running on port ${process.env.port}....`);
});
app.get("/", (req, res) => {
  res.send("Test");
});
