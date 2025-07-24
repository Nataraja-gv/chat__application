const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  code: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30,
  },
});

const OtpModel = mongoose.model("Otp", otpSchema);

module.exports = OtpModel;
