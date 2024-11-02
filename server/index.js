require("dotenv").config()
const express = require("express");
const cors = require('cors');


// const marketRoutes = require("./routes/marketRoutes")
// const wareHouseRoutes = require("./routes/wareHouseRoutes")
// const farmerRoutes = require("./routes/farmerRoutes")
const loginRoutes = require("./routes/auth")
const app = express();

app.use(express.json());
const bodyParser = require('body-parser');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/market",marketRoutes);
// app.use("/warehouse",wareHouseRoutes);
// app.use("/farmer",farmerRoutes);
app.use("/login",loginRoutes)



app.listen(process.env.PORT, () => {
    console.log("Server started and now listening",process.env.PORT)
})


module.exports = app;