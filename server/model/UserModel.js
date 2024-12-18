const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email :{
        type : String,
        required: true,
        unique : true,
    },
    password:{
        type: String,
        required: true
    },
    isAdmin :{
        type : Boolean,
        require: true,
        default: false,
    }
},{timestamps:true});

const UserModel = mongoose.model("users", UserInfo);

module.exports = UserModel;