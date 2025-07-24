const JWT = require("jsonwebtoken");
const User = require("../models/usermodel");

const UserAuth = async (req, res, next) => {
  const { usertoken } = req.cookies;
  if (!usertoken) {
    return res.status(200).json({ message: "Please Login" });
  }

  const decodedId = await JWT.verify(
    usertoken,
    process.env.MONGOOSE_JWT_SECRET
  );
  const { _id } = decodedId;

  const user = await User.findById({ _id });
  if (!user) {
    return res.status(401).json({ message: "  user not found" });
  }
  req.user = user;
  next();
};

module.exports = UserAuth;
