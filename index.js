const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Database/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const app = express();

// Import Routes
const BuyerRoute = require("./Routes/BuyerManagement/BuyerRoute.js");
const BlogRoute = require("./Routes/BlogManagement/BlogRoute.js");
const PaymentRoute = require("./Routes/PaymentManagement/PaymentRoute.js");
const SellerRoute = require("./Routes/SellerManagement/SellerRoute.js");
const ProductRoute = require("./Routes/ProductManagement/ProductRoute.js");
const CartRoute = require("./Routes/CartManagement/CartRoute.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/buyer', BuyerRoute);
app.use('/product', ProductRoute);
app.use('/blog', BlogRoute);
app.use('/payment', PaymentRoute);
app.use('/seller', SellerRoute);
app.use('/cart', CartRoute);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); 