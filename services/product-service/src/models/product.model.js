// Phase 2: Write your Product Mongoose Sche fro
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
         

    pname :{
        type : String,
        required : true
    },

    type :{
        type : String,
        required : true
       
    },
    brand :{
        type : String,
        required : true
       

    },
    description :{
        type : String,
        required : true
       
    },
    price :{
       type : Number,
       required : true,
       min : 0

    },
    stock:{
        type : Number,
        required : true,
        min :0,
        validate: {
  validator: Number.isInteger,
  message: "Stock must be a whole number"
}

    },
    discount :{
        type : Number,
        default : 0,
        min:0,
        max:100,

    },
    imageUrl :{
        type : String,
        required :fasle,

    },
   
    });
module.exports = mongoose.model("Product", productSchema);
