const router = require('express').Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./Verifytoken')
const order = require('../models/Order')
const Order = require('../models/Order')
router.post("/",verifyToken,async (req,res)=>{
    
    const neworder= new order(req.body)
 
   try{
  const savedorder= await neworder.save();
  //save with edit
  res.status(201).json(savedorder) 
   }catch(err){
       res.status(500).json(err)
   }
})
//update
router.put('/:id', verifyTokenAndAuthorization,async (req,res)=>{
    
    try{
        const updateorder=await order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
     res.status(200).json(updateorder)
    }catch(err){
        res.status(500).json(err)
    }

})
//Delete
router.delete('/:id', verifyTokenAndAuthorization,async (req,res)=>{
    try{
    await order.findByIdAndDelete(req.params.id)
    res.status(200).json('Order has been deleted')
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get Orders
router.get('/find/:id', verifyTokenAndAuthorization ,async (req,res)=>{
    try{
    const order=await order.find({ userId:req.params.id})
    res.status(200).json(order )
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get All product
router.get('/find',verifyTokenAndAdmin, async (req,res)=>{
   
    try{
        const orders=await  order.find();
        res.status(200).json(orders)
       }
       catch(err){
           res.status(500).json(err)
       }
   })
//Get Monthly income 
router.get('/income',verifyTokenAndAdmin, async (req,res)=>{
     const date = new Date();
     const lastmonth= new Date(date.setMonth(date.getMonth()-1))
     const previousmonth= new Date(lastmonth.setMonth(date.getMonth()-1))
    try{
     const income= await Order.aggregate([
        {$match:
            {createdAt:{$gte:previousmonth}}
        }
        ,
        {$project:
            {month:{$month:"$createdAt"},sales:"$amount"}
        },
        {
            $group:{
                _id:"$month",
                tptal:{$sum:"$sales"}
            }
        }
        ])
        res.status(200).json(income)
    }catch(err){
       res.status(500).json(err)
    }

})

module.exports = router