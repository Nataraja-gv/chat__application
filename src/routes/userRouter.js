const express = require("express");
const {
  userRegister,
  sendOtp,
  verifyOtp,
  userLogin,
} = require("../controllers/userControllers");
const upload = require("../middlewares/multer");
const UserAuth = require("../middlewares/userAuth");

const userRouter = express.Router();

userRouter.post(
  "/backend/user/register",
  upload.single("photoUser"),
  userRegister
);
userRouter.post("/backend/user/otp", sendOtp);
userRouter.post("/backend/user/otp/verify", verifyOtp);
userRouter.post("/backend/user/login", userLogin);

module.exports = userRouter;
