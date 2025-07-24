const User = require("../models/usermodel");
const otpGenerator = require("otp-generator");
const { customOtpGen } = require("otp-gen-agent");
const sendOTPEmail = require("../utils/sendotpmailer");
const OtpModel = require("../models/otpmodel");

const userRegister = async (req, res) => {
  try {
    const { fullName, phone, email, about } = req.body;
    const validField = ["fullName", "phone", "email", "about"];
    for (const field of validField) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!req.file) {
      return res.status(400).json({ message: "user photo required" });
    }
    const reqBodys = Object.keys(req.body);
    const inValidFields = reqBodys.filter(
      (field) => !validField.includes(field)
    );
    if (inValidFields.length > 0) {
      return res.status(400).json({
        message: `Invalid field(s): ${inValidFields.join(", ")}`,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already in use" });
    }

    const user = new User({
      fullName,
      phone,
      email,
      about,
      photoUser: req.file.location,
    });

    const response = await user.save();

    // const token = await response.getJWT();
    // res.cookie("usertoken", token);

    res
      .status(200)
      .json({ message: "user register successfully", data: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { userId } = req.query;
    const validUser = await User.findById({ _id: userId });
    if (!validUser) {
      return res.status(401).json({ message: "Invalid user" });
    }
    const otpCode = await customOtpGen({ length: 4 });

    const existingUserOTP = await OtpModel.findOne({
      userId: userId,
    });

    if (existingUserOTP) {
      existingUserOTP.code = otpCode;
      await existingUserOTP.save();
    } else {
      const store_otp = new OtpModel({
        userId,
        code: otpCode,
      });
      await store_otp.save();
    }

    await sendOTPEmail(validUser.email, otpCode);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { userId } = req.query;
    const validUser = await User.findById({ _id: userId });
    if (!validUser) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // const otpCode = otpGenerator.generate(4, {
    //   digits: true,
    //   alphabets: false,
    //   upperCase: false,
    //   specialChars: false,
    // });
    const otpCode = await customOtpGen({ length: 4 });

    const existingUserOTP = await OtpModel.findOne({
      userId: userId,
    });

    if (existingUserOTP) {
      existingUserOTP.code = otpCode;
      await existingUserOTP.save();
    } else {
      const store_otp = new OtpModel({
        userId,
        code: otpCode,
      });
      await store_otp.save();
    }

    await sendOTPEmail(validUser.email, otpCode);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { code } = req.body;
    const { userId } = req.query;
    const validUser = await User.findById({ _id: userId });
    // if (!validUser) {
    //   return res.status(401).json({ message: "Invalid user" });
    // }
    const verifyuserOTP = await OtpModel.findOne({
      userId: userId,
    });
    if (!verifyuserOTP) {
      return res.status(400).json({ message: "otp already expire" });
    }

    const verify = verifyuserOTP.code === code;
    if (!verify) {
      return res.status(400).json({ message: "otp invalid" });
    }

    const token = await validUser.getJWT();
    res.cookie("usertoken", token);
    res.status(200).json({ messsage: "login Sucessfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { userRegister, sendOtp, userLogin, verifyOtp };
