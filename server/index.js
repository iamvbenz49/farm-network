require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");



const marketRoutes = require("./routes/marketRoutes")
const wareHouseRoutes = require("./routes/wareHouseRoutes")
const farmerRoutes = require("./routes/farmerRoutes")
const loginRoutes = require("./routes/auth")
const app = express();

app.use(express.json());
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use("/market",marketRoutes);
app.use("/warehouse",wareHouseRoutes);
app.use("/farmer",farmerRoutes);
app.use("/login",loginRoutes)


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