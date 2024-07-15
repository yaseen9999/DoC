const user = require('../models/user');
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hassan4233342@gmail.com',
      pass: 'ogqnyrpcpwgyttcf'
    }
  });
  
const otp = async (req, res) => {
    const { email,timestamp } = req.body;
    console.log(timestamp)
    try {
      const user = await user.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ status: "error", data: "User not found" });
      }
  
      const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      
      user.otp = otp;
      user.otpTimestamp = timestamp; 
      await user.save();
  
      const mailOptions = {
        from: 'testingappver0.1@gmail.com',
        to: email,
        subject: 'OTP for Account Verification',
        text: `Your OTP is: ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ status: "error", data: "Error while sending OTP" });
        }
        console.log('Email sent: ' + info.response);
        res.json({ status: "ok", data: "OTP sent successfully" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", data: "Error while sending OTP" });
    }
  }
  module.exports={otp}