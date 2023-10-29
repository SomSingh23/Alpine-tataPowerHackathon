let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  api_key: String,
  id:String
});
let Key = mongoose.model("Key", Schema);
module.exports = Key;
