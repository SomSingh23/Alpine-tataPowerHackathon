require("dotenv").config();
let express = require("express");
let app = express();
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.port}....`);
});
app.get("/", (req, res) => {
  res.send("Test");
});
