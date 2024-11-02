const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const checkPassword = require("../middleware/checkPassword")
const findFarmerByGmail = require("../database/get-farmer");

require("dotenv").config()

const authorize = async (req, res, next) => {
  const { gmail, password, userType } = req.body;
  try {
    let user = await findFarmerByGmail(gmail);
    // let user;
      if(userType === "Farmer") {
        
      } else if(userType === "Market") {

      } else if(userType === "Transport") {

      } else {

      }
      if (!user) {
        return res.status(400).json({ message: "Invalid Login" });
      }
    
      const isPasswordValid = await checkPassword(password, user.password);
    
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Login" });
      }

      console.log(user);
      req.user = { name: user.name, gmail: user.gmail, password: user.password }; 
      next();
  } catch (err) {
      console.error("Authorization error:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
}


function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET)
}

router.post('/', authorize, (req, res) => {
  const { gmail } = req.body;
  const accessToken = generateAccessToken({ email: gmail }); 
  console.log(accessToken)
  res.status(200).json({ "accessToken":accessToken, userType: req.body.userType });
});


const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401); 
  console.log(authHeader)
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403); 
      // console.log(user)
      // Ensure user is defined and contains gmail
      if (!user || !user.email) {
          return res.sendStatus(403); // Forbidden if user or gmail is not found
      }

      const foundUser = await findFarmerByGmail(user.email); 

      if (!foundUser) {
          return res.sendStatus(404); // Not Found if user is not found
      }

      req.user = foundUser; // Attach the found user to the request object
      next();
  });
};




module.exports = router;