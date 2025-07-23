const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Payment", PaymentSchema);