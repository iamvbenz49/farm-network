require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");



const marketRoutes = require("./routes/marketRoutes")
const wareHouseRoutes = require("./routes/wareHouseRoutes")
const app = express();

app.use(express.json());

app.use("/market",marketRoutes);
app.use("/warehouse",wareHouseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started and now listening",process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = app;