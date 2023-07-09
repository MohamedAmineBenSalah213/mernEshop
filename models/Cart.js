const mongoose=require('mongoose')

const CartSchema = new mongoose.Schema(
    {
        userId :{ type:String,required:true},
        Products:[{productId:{type:String},quantity:{type:Number,default:1}}],
       

        //remplace createdAt
    },{timestamps:true}
)
module.exports= mongoose.model("Cart",CartSchema)