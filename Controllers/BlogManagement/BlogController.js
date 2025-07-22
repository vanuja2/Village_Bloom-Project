const BlogModel = require("../../Models/BlogManagement/BlogModel");
const UserModel = require("../../Models/BuyerManagement/BuyerModel"); 
const { v4: uuidv4 } = require("uuid");
const path = require("path");

//Display Data
const getAllDetails = async (req, res, next) => {
    let blog;
    try {
        blog = await BlogModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({ blog });
};

//Insert Data
const addData = async (req, res, next) => {
    const { userID, title, description, date, ownerName, category } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const imgURL = file.filename; // Save only the unique name of the image

    try {
        const blog = new BlogModel({
            userID,
            title,
            description,
            date,
            ownerName,
            category,
            imgURL,
        });

        await blog.save();

        return res.status(200).json({ blog });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ blog });
};

//Update Details
const updateData = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, date, ownerName, category } = req.body || {}; // Fallback to empty object if req.body is undefined
    const file = req.file;

    let blog;

    try {
        // Find the blog by ID
        blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Prepare updated data
        const updatedData = {
            userID: blog.userID, // Preserve userID
            title: title || blog.title,
            description: description || blog.description,
            date: date || blog.date,
            ownerName: ownerName || blog.ownerName,
            category: category || blog.category,
        };

        // Update imgURL if a new file is uploaded
        if (file) {
            updatedData.imgURL = file.filename;
        }

        // Update the blog in the database
        blog = await BlogModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!blog) {
            return res.status(500).json({ message: "Failed to update blog" });
        }

        return res.status(200).json({ blog });

    } catch (err) {
        console.error("Error updating blog:", err.message);
        console.error("Stack trace:", err.stack);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//Delete data
const deleteData = async (req, res, next) => {
    const id = req.params.id;

    let blog;

    try {
        blog = await BlogModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable to Delete Details" });
    }
    return res.status(200).json({ blog });
};

const likeBlog = async (req, res, next) => {
    const { id } = req.params;
    const { userID } = req.body;

    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.likes.includes(userID)) {
            blog.likes = blog.likes.filter((like) => like !== userID); // Unlike
        } else {
            blog.likes.push(userID); // Like
        }

        await blog.save();
        return res.status(200).json({ likes: blog.likes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addComment = async (req, res, next) => {
    const { id } = req.params;
    const { userID, comment } = req.body;

    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const user = await UserModel.findById(userID); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newComment = {
            userID,
            userFullName: user.fullName, 
            text: comment,
            timestamp: new Date(),
        };

        blog.comments.push(newComment);
        await blog.save(); 

        return res.status(200).json({ comments: blog.comments }); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteComment = async (req, res, next) => {
    const { id, commentIndex } = req.params;

    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (!blog.comments[commentIndex]) {
            return res.status(404).json({ message: "Comment not found" });
        }

        blog.comments.splice(commentIndex, 1); // Remove the comment at the specified index
        await blog.save(); // Save the updated blog

        return res.status(200).json({ comments: blog.comments }); // Return updated comments
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllDetails = getAllDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.likeBlog = likeBlog;
exports.addComment = addComment;
exports.deleteComment = deleteComment;