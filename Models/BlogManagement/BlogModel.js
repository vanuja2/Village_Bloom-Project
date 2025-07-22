const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    date: {
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
    imgURL: {
        type: String,
        required: true,
    },
    likes: {
        type: [String], // Array of user IDs
        default: [],
    },
    comments: {
        type: [
            {
                userID: String,
                userFullName: String,
                text: String,
                timestamp: Date,
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model("Blog", BlogSchema);