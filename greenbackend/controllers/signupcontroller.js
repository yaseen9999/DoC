const useraccounts = require('../models/useraccounts');
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
    console.log(req.body,"signup")
    const { email, password } = req.body;
  
    try {
      if (!password || !email) {
        return res.status(400).send({ status: "error", data: "Input Required" });
      }
  
      const existingUser = await useraccounts.findOne({ email });
  
      if (existingUser) {
        return res.send({ status: "error", data: "Email is taken try another" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await useraccounts.create({
     
        email : email,
        password: hashedPassword,
      });
  
      res.send({ status: "ok", data: "User Created" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", data: "Error during registration" });
    }
  }
  module.exports ={signup};
  