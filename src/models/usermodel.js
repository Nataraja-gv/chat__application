const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoUser: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const usertoken = await JWT.sign(
    { _id: user?._id },
    process.env.MONGOOSE_JWT_SECRET,
    { expiresIn: "2d" }
  );
  return usertoken;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
