const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Free land: Formar name,formar id ,type of land, water level, area , rating, crops (crops can be planted)
// Processing land : product, product quentity, land area, formar id ,formar name, stating date, supply date
// There is two lands only?. @Sham Vijay . Free & processing

const LandSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,  // Reference to Farmer model
        ref: "Farmer",
        required: true
    },
    landtype:{
        type:Number,
        required: true
    },
    area: {
        type:Number,
        required: true
    },
    rating: {
        type:Number,
        required: true
    },
    crops:{
        type:[String],
        required:true
    },
    waterlevel: {
        type: Number,
        required: true
    },
    plant: {
        type: Schema.Types.ObjectId,  // Reference to Need model
        ref: "Need",
    }
});

module.exports = mongoose.model("lands", LandSchema);
