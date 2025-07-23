const express = require("express");
const router = express.Router();
const SellerController = require("../../Controllers/SellerManagement/SellerController");

router.get("/", SellerController.getAllDetails);
router.post("/", SellerController.addData);
router.get("/:id", SellerController.getById);
router.put("/:id", SellerController.updateData);
router.delete("/:id", SellerController.deleteData);
router.post("/login", SellerController.login);
//export
module.exports = router;