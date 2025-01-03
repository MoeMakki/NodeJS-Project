const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type : String,
        required: true,
        maxLength : 25,
    },

    password:{
        type : String,
        required: true,
        maxLength: 50,
    },
    cart:{ 
        items:[{ 
            productId:{ type:Schema.Types.ObjectId,required:true, ref:'products'}, 
            quantity: {type: Number, required: true} 
        }] 
    } 

});




module.exports = mongoose.model("users", UserSchema);