const router = require('express').Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./Verifytoken')
const cart = require('../models/Cart')
router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    
    const newcart= new cart(req.body)
 
   try{
  const savedcart= await newcart.save();
  //save with edit
  res.status(201).json(savedcart) 
   }catch(err){
       res.status(500).json(err)
   }
})
//update
router.put('/:id', verifyTokenAndAuthorization,async (req,res)=>{
    
    try{
        const updatecart=await cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
     res.status(200).json(updatecart)
    }catch(err){
        res.status(500).json(err)
    }

})
//Delete
router.delete('/:id', verifyTokenAndAuthorization,async (req,res)=>{
    try{
    await cart.findByIdAndDelete(req.params.id)
    res.status(200).json('cart has been deleted')
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get user cart 
router.get('/find/:userid',verifyTokenAndAuthorization,async (req,res)=>{
    try{
    const cart=await cart.findOne({userId:req.params.userid})
    res.status(200).json(cart )
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get All product
router.get('/',verifyTokenAndAdmin, async (req,res)=>{
  //const category=req.query.category
    
    try{
     const carts=await  cart.find();
     res.status(200).json(carts)
    }
    catch(err){
        res.status(500).json(err)
    }
})





module.exports = router