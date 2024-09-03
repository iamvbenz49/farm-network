const express = require("express");
const router = express.Router();
const Farmer = require("../models/FarmerModel");
const Need = require("../models/NeedModel");

router.get("/", async (req,res) => {
    const {farmerId} = req.query;
    console.log(farmerId)
    try {
        const farmerData = await Farmer.findByIdAndUpdate(
            farmerId,
            { new: true } 
        );
        return res.status(200).json({farmerData})
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
