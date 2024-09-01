const express = require("express");
const router = express.Router();
const Land = require("../models/LandModel");
const Need = require("../models/NeedModel");
const Farmer = require("../models/FarmerModel")
const {  ObjectId } = require('mongodb');

const temphouse = "Warehouse 1";
router.get("/", async (req, res) => {
    try {
        const data = await Land.find({"warehouse":temphouse})
        return res.status(200).json({data})
    } catch(e) {
        console.log("Database error : Warehouse GET Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

router.post("/", async (req, res) => {
    const { farmerId, needId } = req.body;
    try {
        console.log("here", needId)
        const data = await Need.findByIdAndUpdate(
            needId,
            { needtype: 'Pending' },
            { new: true } 
        );
        console.log(data)
        const result = await Farmer.findByIdAndUpdate(
            farmerId,  
            { $push: { requests: needId} },
            { new: true, useFindAndModify: false } 
        );
        return res.status(200).json({result});     
    } catch(e) {
        console.log("Database error : Warehouse POST Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

module.exports = router;
