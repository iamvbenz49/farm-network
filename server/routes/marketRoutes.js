const express = require("express");
const router = express.Router();
const Need = require("../models/NeedModel");
const mongoose = require("mongoose")

const temphouse = "Warehouse 1";
router.get("/processing", async (req,res) => {
    try {
        const data = await Need.find({"warehouse":temphouse, "needtype":"Processed"})
        return res.status(200).json({data})
    } catch(e) {
        console.log("Database error : Processing Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

router.get("/processed", async (req,res) => {
    try {
        const data = await Need.find({"warehouse":temphouse, "needtype":"Processed"});
        return res.status(200).json({data})
    } catch(e) {
        console.log("Database error : Preprocessed Route")
        console.log(e)
        return res.status(400).json({e})
    }
})

router.get("/upcoming", async (req,res) => {
    try {
        const data = await Need.find({"warehouse":temphouse, "needtype":"Upcoming"});
        return res.status(200).json({data})
        
    } catch(e) {
        console.log("Database error : Upcoming Route")
        console.log(e)
        return res.status(400).json({e})
    }
})


module.exports = router;
