const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    accesstoken:{
        type:String,
        required:true
    },
    usertype: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model("users", UserSchema);
