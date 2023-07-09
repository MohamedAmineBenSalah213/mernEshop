const router = require('express').Router()
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./Verifytoken')
const product = require('../models/Product')
router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    
    const newproduct= new product({
        title :req.body.title,
      type:req.body.type,
      desc:req.body.desc,
      img:req.body.img,
      categories:req.body.categories,
      price:req.body.price
      
   })
 
   try{
  const savedproduct= await newproduct.save();
  //save with edit
  res.status(201).json(savedproduct) 
   }catch(err){
       res.status(500).json(err)
   }
})
//update
router.put('/:id',verifyTokenAndAdmin,async (req,res)=>{
    
    try{
        const updateproduct=await product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
     res.status(200).json(updateproduct)
    }catch(err){
        res.status(500).json(err)
    }

})
//Delete
router.delete('/:id',verifyTokenAndAdmin,async (req,res)=>{
    try{
    await product.findByIdAndDelete(req.params.id)
    res.status(200).json('product has been deleted')
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get User 
router.get('/find/:id',verifyTokenAndAdmin,async (req,res)=>{
    try{
    const product=await product.findById(req.params.id)
    res.status(200).json(product )
    }
    catch(err){
        res.status(500).json(err)
    }
})
//Get All product
router.get('/find', async (req,res)=>{
    const category=req.query.category
    
    try{
        if(category){
        qproduct = await product.find({categories:{ $in:[category]}})
        res.status(200).json(qproduct )
        }
        else{
        products = await product.find()  
        res.status(200).json(products )  
        }
   // const products=await product.find()
   
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router