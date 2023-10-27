require("dotenv").config();
let express = require("express");
let path = require("path");
let app = express();
let getApi = require("./utils/middleware/getApi");
app.set("view engine", "ejs");
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.port}....`);
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/api/ev", getApi, (req, res) => {
  res.json({
    result: "Success",
  });
});
