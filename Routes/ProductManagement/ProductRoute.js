const express = require("express");
const router = express.Router();
const ProductController = require("../../Controllers/ProductManagement/ProductController");

router.get("/", ProductController.getAllDetails);
router.post("/", ProductController.addData);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.updateData);
router.delete("/:id", ProductController.deleteData);
router.delete("/:id/image", ProductController.deleteImage);
//export
module.exports = router;