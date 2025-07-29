const express = require("express");
const {
  userRegister,
  sendOtp,
  verifyOtp,
  userLogin,
  getAllUser,
  userProfile,
  userLogout,
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
userRouter.get("/backend/all/users", UserAuth, getAllUser);
userRouter.get("/backend/user/profile", UserAuth, userProfile);
userRouter.post("/backend/user/logout", userLogout);

module.exports = userRouter;
