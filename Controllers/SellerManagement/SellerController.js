const SellerModel = require("../../Models/SellerManagement/SellerModel");

//Display Data
const getAllDetails = async (req, res, next) => {
    let seller;
    try {
        seller = await SellerModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!seller) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ seller });
};

//Insert Data
const addData = async (req, res, next) => {
    const { fullName, email, password, phone, address,category,status } = req.body;

    try {
        const existingEmail = await SellerModel.findOne({ email });
        if (existingEmail) { 
            return res.status(400).json({ message: "Email already exists" });
        }
    
        const seller = new SellerModel({
            fullName,
            email,
            password,
            phone,
            address,
            category,
            status
        });

        await seller.save();

        return res.status(200).json({ seller });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let seller;
    try {
        seller = await SellerModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!seller) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ seller });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { fullName, email, password, phone, address,status,category } = req.body;

    let seller;

    try {
        seller = await SellerModel.findByIdAndUpdate(id, {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone,
            address: address,
            status: status,
            category: category
        });
        seller = await seller.save();
    } catch (err) {
        console.log(err);
    }
    if (!seller) {
        return res.status(404).json({ message: "Unable to Update data" });
    }
    return res.status(200).json({ seller });
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let seller;

    try {
        seller = await SellerModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!seller) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ seller });
};
// Login Controller
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let seller;

    try {
        seller = await SellerModel.findOne({ email: email });

        if (!seller) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (seller.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful", seller });

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