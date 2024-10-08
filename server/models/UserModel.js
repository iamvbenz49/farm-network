const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

module.exports = mongoose.model("users", UserSchema);
