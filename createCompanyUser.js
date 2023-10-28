// require("dotenv").config();
// let mongoose = require("mongoose");
// let User = require("./models/user");
// mongoose
//   .connect(process.env.mongoDB)
//   .then((p) => {
//     console.log("Puze MicroSoft Azure connected :)");
//   })
//   .catch((err) => console.error(err));
// let create = async (username, password) => {
//   let newUser = new User({ username, isCompany: true });
//   let data = await User.register(newUser, password);
//   console.log(data);
// };
// create();
