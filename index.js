require("dotenv").config();
let express = require("express");
let app = express();
let getApi = require("./utils/middleware/getApi");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}....`);
});
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/api/ev", getApi, (req, res) => {
  res.json({
    result: "Success",
  });
});
