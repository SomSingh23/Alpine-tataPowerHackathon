require("dotenv").config();
let express = require("express");
let app = express();
let getApi = require("./utils/middleware/getApi");
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.port}....`);
});
app.get("/", (req, res) => {
  res.send("Test");
});
app.get("/api/ev", getApi, (req, res) => {
  res.json({
    result: "Success",
  });
});
