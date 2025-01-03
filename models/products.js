const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type :String ,
        required : true,
    },
    description: {
        type :String,
        required : true,
    },

    price: {
        type : Number , 
        required : true,
    },

    imageURL: {
        type : String,
        required : false,
    },
    UserId:{    
        type: Schema.Types.ObjectId,    
        ref: 'users',  
    },





});

module.exports = mongoose.model("products" , ProductSchema);