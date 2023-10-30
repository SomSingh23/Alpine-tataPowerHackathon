let Key = require("../../models/api");
let getApi = async (req, res, next) => {
  if (
    req.headers["authorization"]
    // this header will be replaced in future
  ) {
    let data = await Key.findOne({ id: req.headers["authorization"] });
    if (data) {
      next();
    } else {
      res.status(401).send("Unauthorized,use proper Authorization header");
    }
  } else res.status(401).send("Unauthorized,use proper Authorization header");
};
module.exports = getApi;
