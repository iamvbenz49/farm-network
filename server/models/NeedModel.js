const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NeedSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    msp: {
        type: Number,
        required: true
    },
    totalmsp: {
        type: Number,
        required: true
    },
    warehouse: {
        type: String,
        required: true
    },
    needtype: {
        type: String,
        required: true
    },
    status: {
        
    }
});

module.exports = mongoose.model("needs", NeedSchema);

