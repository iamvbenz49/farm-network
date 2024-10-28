import express from "express";
import bodyParser from "body-parser";

require("dotenv").config()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started and now listening",process.env.PORT)
})