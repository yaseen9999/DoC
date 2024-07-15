const useraccounts = require('../models/useraccounts');
const bcrypt = require("bcrypt");
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
      const user = await useraccounts.findOne({ email }).maxTimeMS(666660000);
      console.log(user)
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        console.log('Password is correct');
        return res.status(200).send({ message: 'Login successful', userId: user._id }); 
      } else {
        console.log('Password is incorrect');
        return res.status(400).json({ message: 'Incorrect password' }); 
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' }); // Handle internal server error
    }
  }
  module.exports={login};