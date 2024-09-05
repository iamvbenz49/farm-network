const UserModel = require("../models/UserModel")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

const authorize = async (req, res, next) => {
    const usermail = req.body.username;
    const password = req.body.password;
    const username = usermail.slice(0, usermail.length-10)
    console.log(username)
    const user = await UserModel.findOne({"username":username});
    // console.log( await UserModel.find({"username":username}))
    if(!user || user.password !== password) {
        return res.status(200).json({message:"Invalid Login"})
    }
    req.body.password = user.accesstoken;
    req.body.type = user.usertype;
    next()
}

function generateAccessToken(user, token) {
    return jwt.sign(user, token)
}

router.post('/', authorize, (req, res) => {
    // Authenticate User
    const username = req.body.username
    const user = { name: username }
    console.log(req.body.username)
    const accessToken = generateAccessToken(user, req.body.password)
    
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken) 
    res.json({ accessToken: accessToken, usertype:req.body.type })
})

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    const user = await UserModel.findOne({"name":username});
    jwt.verify(token, user.accesstoken, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}


module.exports = router;