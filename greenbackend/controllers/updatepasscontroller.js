const user = require('../models/user');
const bcrypt = require("bcrypt");
const updatepass= async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and new password are required.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await user.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      return res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating password.' });
    }
  }
  module.exports={updatepass}