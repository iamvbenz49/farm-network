const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "Need",
        required: true
    },
    land:{
        type: Boolean,
        required:true
    }
});

module.exports = mongoose.model("farmers", NotificationSchema);
