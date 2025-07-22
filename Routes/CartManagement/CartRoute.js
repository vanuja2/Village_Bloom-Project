const express = require("express");
const router = express.Router();
const CartController = require("../../Controllers/CartManagement/CartController");

router.get("/", CartController.getAllDetails);
router.post("/", CartController.addData);
router.get("/:id", CartController.getById);
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { cartQuantity } = req.body;

    if (!id) { // Ensure id is provided
        return res.status(400).json({ message: "ID parameter is missing" });
    }

    if (cartQuantity === undefined || cartQuantity <= 0) { // Ensure cartQuantity is valid
        return res.status(400).json({ message: "Invalid quantity" });
    }

    try {
        const updatedCart = await CartController.updateData(req, res); // Pass req and res to the controller
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found" });
        }
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/:id", CartController.deleteData);
//export
module.exports = router;