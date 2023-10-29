let isCom = (req, res, next) => {
  let ans = false;
  if (req.user === undefined) {
    req.session.whatUserWant = req.originalUrl;
    return res.redirect("/company_login");
  }
  const propertyCount = Object.keys(req.user).length;
  if (propertyCount === 6) {
    next();
  } else {
    req.session.whatUserWant = req.originalUrl;
    return res.redirect("/company_login");
  }
};
module.exports = isCom;
