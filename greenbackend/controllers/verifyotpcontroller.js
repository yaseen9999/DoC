const user = require('../models/user');
  
const verifyotp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await user.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ status: "error", data: "User not found" });
      }
      if (user.otp === otp && Date.now() - user.otpTimestamp <= 600000) {
        user.otp = null;
        user.otpTimestamp = null; 
        await user.save();
        return res.json({ status: "ok", data: "OTP verified successfully" });
      } else {
        return res.status(400).json({ status: "error", data: "Invalid or expired OTP" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", data: "Error while verifying OTP" });
    }
  }
  module.exports={verifyotp}