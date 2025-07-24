const nodemailer = require("nodemailer");

const sendOTPEmail = async (toEmail, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "natarajagv369@gmail.com",
        pass: "rgdy anma umhf mjxg",
      },
    });

    const mailOptions = {
      from: '"Chatapp" <noReplay@gmail.com>',
      to: toEmail,
      subject: "otp",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #2EC155; text-align: center;">🔐 One-Time Password</h2>
            <p>Hi there,</p>
            <p>We received a request to verify your identity. Use the OTP below to complete the process:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #333; background-color: #e9f5ee; padding: 10px 20px; border-radius: 6px;">
                ${otpCode}
              </span>
            </div>
            <p>This code is valid for the next 1 minutes. Please do not share it with anyone.</p>
            <p>If you did not request this, please ignore this email or contact support.</p>
            <hr style="margin: 30px 0;" />
            <p style="font-size: 14px; color: #888;">Thank you,<br />The ChatApp Team</p>
          </div>
        </div>
         `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = sendOTPEmail;
