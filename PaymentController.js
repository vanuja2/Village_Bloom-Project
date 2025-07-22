const PaymentModel = require("../../Models/PaymentManagement/PaymentModel");
const CartModel = require("../../Models/CartManagement/CartModel"); // Import CartModel

//Insert Data
const addData = async (req, res, next) => {
    const { fullName, email, phone, address, total, cartItemIDs, userID } = req.body; // Include userID

    try {
        const payment = new PaymentModel({
            fullName,
            email,
            phone,
            address,
            total,
        });

        await payment.save();

        if (Array.isArray(cartItemIDs) && cartItemIDs.length > 0) {
            const deleteResult = await CartModel.deleteMany({ _id: { $in: cartItemIDs }, userID }); // Filter by userID
            console.log(`Deleted ${deleteResult.deletedCount} cart items for user ${userID}.`);
        } else {
            console.log("No cart items to delete.");
        }

        return res.status(200).json({ message: "Payment successful and cart items deleted", payment });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.addData = addData;