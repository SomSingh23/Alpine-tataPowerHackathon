let checkCompany = (req) => {
  return new Promise((resolve, reject) => {
    let ans = false;
    if (req.user === undefined) {
      req.session.whatUserWant = req.originalUrl;
      resolve(false);
    }
    const propertyCount = Object.keys(req.user).length;
    if (propertyCount === 6) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};
module.exports = checkCompany;
