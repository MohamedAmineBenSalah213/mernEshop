const user = require('../models/user')
const Crypto=require('crypto-js')
const router = require('express').Router()
const jwt = require('jsonwebtoken' )

//Register
router.post("/register",async (req,res)=>{
    
     const newUser= new user({
        username:req.body.username,
        email:req.body.email,
        password:Crypto.AES.encrypt(req.body.password,"amine").toString(),
       
    })
    try{
   const saveduser= await newUser.save();
   //save with edit
   res.status(201).json(saveduser) 
    }catch(err){
        res.status(500).json(err)
    }
})
//Login
router.post('/login',async (req,res)=>{
    try{
        const User =await user.findOne({username:req.body.username})
        !user && res.status(401).json("Wrong Credentials !")
        const hashed =Crypto.AES.decrypt(User.password,"amine")
        const opassword =hashed.toString(Crypto.enc.Utf8)
      opassword !== req.body.password && res.status(401).json("Wrong Credentials !")
      const accessToken=jwt.sign({
        id:User.email,isAdmin:User.isAdmin
      },"amine",{expiresIn:"3d"})    
        res.status(200).json({User,accessToken})
    }catch(err){
        console.log(err)
    }
})
module.exports = router