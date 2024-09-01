const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FarmerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    land:{
        type: [Schema.Types.ObjectId],  
        ref: "Land",
    },
    requests:{
        type: [Schema.Types.ObjectId],  
        ref: "Need",
    }
});

module.exports = mongoose.model("farmers", FarmerSchema);
