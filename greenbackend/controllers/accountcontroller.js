const useraccounts = require('../models/useraccounts');

const account= async (req, res) => {
    try {
  const {avatarUri,name,dob,email,gender,userId}=req.body;
  const updatedUser = await useraccounts.findByIdAndUpdate(
    userId,
    {
      $set: {
        'details.avataruri': avatarUri,
        'details.name': name,
        'details.dateOfBirth': dob,
        'details.Email': email,
        'details.Gender': gender
      }
    },
    { new: true }
  );
  
  if (!updatedUser) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ success: true, user: updatedUser });
  } catch (error) {
  console.error(error);
  res.status(500).json({ success: false, error: 'Server Error' });
  }
  }
  module.exports={account}
       