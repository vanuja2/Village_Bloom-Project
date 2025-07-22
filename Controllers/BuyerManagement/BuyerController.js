const BuyerModel = require("../../Models/BuyerManagement/BuyerModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let buyer;
    try {
        buyer = await BuyerModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!buyer) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ buyer });
};

//Insert Data
const addData = async (req, res, next) => {
    const { fullName, email, password, phone, address } = req.body;

    try {
        const existingEmail = await BuyerModel.findOne({ email });
        if (existingEmail) { 
            return res.status(400).json({ message: "Email already exists" });
        }
    
        const buyer = new BuyerModel({
            fullName,
            email,
            password,
            phone,
            address
        });

        await buyer.save();

        return res.status(200).json({ buyer });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let buyer;
    try {
        buyer = await BuyerModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!buyer) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ buyer });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { fullName, email, password, phone, address } = req.body;

    let buyer;

    try {
        buyer = await BuyerModel.findByIdAndUpdate(id, {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone,
            address: address
        });
        buyer = await buyer.save();
    } catch (err) {
        console.log(err);
    }
    if (!buyer) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ buyer });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let buyer;

    try {
        buyer = await BuyerModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!buyer) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ buyer });
};
// Login Controller
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let buyer;

    try {
        buyer = await BuyerModel.findOne({ email: email });

        if (!buyer) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (buyer.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", buyer });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.login = login;