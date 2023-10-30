let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  api_key: String,
  id: String,
  count: Number,
});
let Key = mongoose.model("Key", Schema);
module.exports = Key;
