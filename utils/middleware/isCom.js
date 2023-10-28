let isCom = (req, res, next) => {
  let ans = false;
  if (req.user === undefined) {
    return res.redirect("/company_login");
  }
  const propertyCount = Object.keys(req.user).length;
  if (propertyCount === 6) {
    next();
  } else return res.redirect("/company_login");
};
module.exports = isCom;
