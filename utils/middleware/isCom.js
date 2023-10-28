let isCom = (req, res, next) => {
  let ans = false;
  if (req.user) {
    if (req.user.isCompany === true) ans = true;
    else ans = false;
  }
  if (ans === true) {
    next();
  }
  return res.status(300).redirect("/company_login");
};
module.exports = isCom;
