const ProductModel = require("../../Models/ProductManagement/ProductModel");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    if (validExtensions.includes(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, and JPEG files are allowed"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).array("images", 10);

//Display Data
const getAllDetails = async (req, res, next) => {
    let product;
    try {
        product = await ProductModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!product) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ product });
};

//Insert Data
const addData = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Image upload failed", error: err.message });
        }

        const { sellerID, productName, price, description, quantity, category } = req.body;
        const imgURLs = req.files.map((file) => file.filename);

        try {
            const product = new ProductModel({
                sellerID,
                productName,
                price,
                description,
                quantity,
                category,
                imgURLs,
            });

            await product.save();
            return res.status(200).json({ product });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let product;
    try {
        product = await ProductModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!product) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ product });
};

//Update Details
const updateData = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Image upload failed", error: err.message });
        }

        const id = req.params.id;
        const { productName, price, description, quantity, category } = req.body;

        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Update fields
            product.productName = productName;
            product.price = price;
            product.description = description;
            product.quantity = quantity;
            product.category = category;

            // Add new images if any
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => file.filename);
                product.imgURLs = [...product.imgURLs, ...newImages];
            }

            await product.save();
            return res.status(200).json({ product });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let product;

    try {
        product = await ProductModel.findByIdAndDelete(id);
        if (product) {
            // Delete associated images from the uploads folder
            product.imgURLs.forEach((img) => {
                const filePath = path.join(__dirname, "../../uploads", img);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete image file: ${filePath}`, err);
                    }
                });
            });
        }
    } catch (err) {
        console.log(err);
    }
    if (!product) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ message: "Product deleted successfully!" });
};

// Delete a specific image
const deleteImage = async (req, res, next) => {
    const { id } = req.params;
    const { image } = req.body;

    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove image from database
        product.imgURLs = product.imgURLs.filter((img) => img !== image);
        await product.save();

        // Delete image file from uploads folder
        const filePath = path.join(__dirname, "../../uploads", image);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete image file: ${filePath}`, err);
            }
        });

        return res.status(200).json({ message: "Image deleted successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete image" });
    }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.deleteImage = deleteImage;