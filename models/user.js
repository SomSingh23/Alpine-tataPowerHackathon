let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require("mongoose-findorcreate");
let Schema = new mongoose.Schema({
  username: String,
  googleId: String,
  email: String,
  password: String,
  isCompany: Boolean,
});
Schema.plugin(passportLocalMongoose);
Schema.plugin(findOrCreate);
let User = mongoose.model("User", Schema);
module.exports = User;
