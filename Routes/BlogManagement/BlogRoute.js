const express = require("express");
const router = express.Router();
const BlogController = require("../../Controllers/BlogManagement/BlogController");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/blog");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Middleware to handle both file and non-file fields
router.put("/:id", upload.single("image"), BlogController.updateData);
router.get("/", BlogController.getAllDetails);
router.post("/", upload.single("image"), BlogController.addData);
router.get("/:id", BlogController.getById);
router.delete("/:id", BlogController.deleteData);
router.post("/like/:id", BlogController.likeBlog);
router.post("/comment/:id", BlogController.addComment);
router.delete("/comment/:id/:commentIndex", BlogController.deleteComment);

module.exports = router;