const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        username: { type: String, required: true },
    },
    items: [
        {   
            productId: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
            quantity: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model("orders", OrderSchema);