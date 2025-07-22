const express = require("express");
const router = express.Router();
const BuyerController = require("../../Controllers/BuyerManagement/BuyerController");

router.get("/", BuyerController.getAllDetails);
router.post("/", BuyerController.addData);
router.get("/:id", BuyerController.getById);
router.put("/:id", BuyerController.updateData);
router.delete("/:id", BuyerController.deleteData);
router.post("/login", BuyerController.login);
//export
module.exports = router;