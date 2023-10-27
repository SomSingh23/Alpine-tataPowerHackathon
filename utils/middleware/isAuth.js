let isAuth = (req, res, next) => {
  if (req.isAuthenticated() === true) {
    next();
  } else {
    console.log("not authenticated");
    req.session.whatUserWant = req.originalUrl;
    res.status(300).redirect("/api/google/verify");
  }
};
module.exports = isAuth;
