const { dbUserLocate } = require("../utils/general-utils");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const { headload, signature } = req.cookies;
  const verified = jwt.verify(
    `${headload}.${signature}`,
    process.env.SECRET,
    (error, decoded) => {
      if (error) null;
      return decoded;
    }
  );
  return dbUserLocate(verified.userId).then((userInfo) => userInfo);
};
