const express = require("express");
const router = express.Router();
const Farmer = require("../models/FarmerModel");
const Need = require("../models/NeedModel");

router.get("/", async (req,res) => {
    const {farmerId} = req.query;
    try {
        const farmerData = await Farmer.findByIdAndUpdate(
            "64f8e743aa7f454d2e17c8ea",
            { new: true } 
        );
        const NeedData = await Need.find({});
        return res.status(200).json({farmer:farmerData, need:NeedData})
    } catch(e) {
        console.log("Database error : Farmer Route")
        console.log(e)
        return res.status(400).json({e})
    }
})


router.post("/", async (req, res) => {
    const { needId, farmerId } = req.query;
    const { accepted } = req.body;
    try {
        console.log("here", needId)
        if(accepted) {
            await Need.findByIdAndUpdate(
                needId,
                { needtype: 'Upcoming' },
                { new: true } 
            );
        } else  {
            await Farmer.findByIdAndUpdate(
                farmerId,  
                { $pull: { requests: needId} },
                { new: true, useFindAndModify: false } 
            );
        }

        return res.status(200).json({message:"success"});     
    } catch(e) {
        console.log("Database error : Warehouse POST Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

module.exports = router;
