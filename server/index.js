require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");



const routes = require("./routes/marketRoutes")
const app = express();

app.use(express.json());

app.use("/",routes);

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