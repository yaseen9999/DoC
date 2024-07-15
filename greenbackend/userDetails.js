const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    otp : { type: String}
}, {
    collection: 'UserInfo'
});

mongoose.model("UserInfo", UserDetailSchema);
