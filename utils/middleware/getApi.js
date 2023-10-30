let Key = require("../../models/api");
let getApi = async (req, res, next) => {
  if (
    req.headers["authorization"]
    // this header will be replaced in future
  ) {
    let userKey = req.headers["authorization"];
    let data = await Key.findOne({ id: userKey });
    if (data) {
      if (data.count > 499) {
        return res.status(429).json({
          error: "Rate limit exceeded :(",
          message:
            "You have exceeded the rate limit for this API. Please create new API Key 🙏",
        });
      }
      await Key.updateOne(
        { id: data.id },
        { count: data.count + 1 }
        // updating count, when ever this middleware is called even if user get error also :_)
      );

      next();
    } else {
      return res
        .status(401)
        .send("Unauthorized,use proper Authorization header or API Key");
    }
  } else
    return res
      .status(401)
      .send("Unauthorized,use proper Authorization header or API Key");
};
module.exports = getApi;
