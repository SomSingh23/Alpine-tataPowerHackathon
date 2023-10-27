let getApi = (req, res, next) => {
  if (
    req.headers["authorization"] &&
    req.headers["authorization"] === process.env.header
    // this header will be replaced in future
  ) {
    next();
  } else res.status(401).send("Unauthorized,use proper Authorization header");
};
module.exports = getApi;
