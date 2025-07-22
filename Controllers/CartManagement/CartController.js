const CartModel = require("../../Models/CartManagement/CartModel");
const path = require("path");
const fs = require("fs");

//Display Data
const getAllDetails = async (req, res, next) => {
    let cart;
    try {
        cart = await CartModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!cart) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ cart });
};

//Insert Data
const addData = async (req, res, next) => {
    const { userID, productName, price, description, category, cartQuantity, imgURLs } = req.body;

    try {
        const cart = new CartModel({
            userID,
            productName,
            price,
            description,
            category,
            imgURLs: Array.isArray(imgURLs) ? imgURLs : [], // Ensure imgURLs is an array
            cartQuantity,
        });

        await cart.save();
        return res.status(200).json({ cart });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let cart;
    try {
        cart = await CartModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!cart) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ cart });
};

//Update Details
const updateData = async (req, res, next) => {
    const { id } = req.params; // Retrieve id from req.params
    const { cartQuantity } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID parameter is missing" });
    }

    try {
        const cart = await CartModel.findById(id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (cartQuantity !== undefined) { // Update only if cartQuantity is provided
            cart.cartQuantity = cartQuantity;
        }

        await cart.save();
        return res.status(200).json({ cart });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let cart;

    try {
        cart = await CartModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!cart) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ message: "Cart deleted successfully!" });
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;