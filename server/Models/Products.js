//creating product schema in database with name image price and quantity fields
const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
  
        publicId:String,
        url:String,
        
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("product", productSchema);