const express = require("express");
const router = express.Router();
const Land = require("../models/LandModel");


const temphouse = "Warehouse 1";
router.get("/", async (req,res) => {
    try {
        const data = await Land.find({"warehouse":temphouse})
        return res.status(200).json({data})
    } catch(e) {
        console.log("Database error : Warehouse Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

module.exports = router;
