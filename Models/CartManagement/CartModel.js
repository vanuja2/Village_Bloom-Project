const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imgURLs: {
        type: [String],
        required: true,
    },
    cartQuantity: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Cart", CartSchema);