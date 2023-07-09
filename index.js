const express = require('express')
const app=express()
const userRoute = require('./routes/user')
const authRoute =require('./routes/auth')
const productRoute =require('./routes/Product')
const OrderRoute =require('./routes/Order')
const CartRoute =require('./routes/Cart')
const stripe=require('./routes/payement')
const cors =require('cors')

//connect to mongo  
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://mohamedaminebensalah:Sw53CDZWy5w7qpLe@cluster0.mmcyeqk.mongodb.net/?retryWrites=true&w=majority")
   .then(()=>console.log('DBconnection succeful !!'))
    .catch((err)=>{console.log(err)})

//use json 
app.use(express.json())  
//fetch data frontend
app.use(cors({
    origin: 'http://localhost:3000',
  }))
//routes
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/product',productRoute)
app.use('/api/orders',OrderRoute)    
app.use('/api/Cart',CartRoute)   
//use stripe
app.use('/api/stripe',stripe)

app.listen(5000,()=>{
    console.log("backend  server is running ")
})