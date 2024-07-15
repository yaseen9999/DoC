const useraccounts = require('../models/useraccounts');
const getaccounts= async (req, res) => {
    try {
        console.log(req.params.userId);
        const user = await useraccounts.findById(req.params.userId);
        console.log(user);
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }

module.exports={getaccounts}