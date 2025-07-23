import React from "react";
import { Route, Routes } from "react-router-dom";
import BuyerLogin from './Pages/BuyerManagement/BuyerLogin'
import BuyerRegister from './Pages/BuyerManagement/BuyerRegister'
import BuyerUpdateProfile from "./Pages/BuyerManagement/UpdateBuyerProfile";
import SellerLogin from './Pages/SellerManagement/SellerLogin'
import SellerAccountRequest from './Pages/SellerManagement/SellerAccountRequest';
import UpdateSellerProfile from './Pages/AdminManagement/UpdateSellerProfile'
import SellerRequest from './Pages/AdminManagement/SellerRequest'
import SellerDash from "./Pages/SellerManagement/SellerDash";
import AddProduct from "./Pages/SellerManagement/AddProduct";
import UpdateProduct from "./Pages/SellerManagement/UpdateProduct";
import AddProductAdmin from "./Pages/AdminManagement/AddProductAdmin";
import AdminDash from "./Pages/AdminManagement/AdminDash";
import UpdateProductAdmin from "./Pages/AdminManagement/UpdateProductAdmin";
import AdminLogin from "./Pages/AdminManagement/AdminLogin";
import Home from "./Pages/Home/Home";
import SingalProductView from "./Pages/Home/SingalProductView";
import AddToCart from "./Pages/CartManagement/AddToCart";
import Payment from "./Pages/CartManagement/Payment";
import AllBlog from "./Pages/BlogManagement/AllBlog";
import AddBlog from "./Pages/BlogManagement/AddBlog";
import UpdateBlog from "./Pages/BlogManagement/UpdateBlog";
import ProductPage from "./Pages/Home/ProductPage";
function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/productHome" element={<ProductPage />} />
          {/*Buyer*/}
          <Route path="/" element={<BuyerLogin />} />
          <Route path="/buyerRegister" element={<BuyerRegister />} />
          <Route path="/singalProductView" element={<SingalProductView />} />
          <Route path="/addtoCart" element={<AddToCart />} />
          <Route path="/updateBuyerProfile/:id" element={<BuyerUpdateProfile />} />
          <Route path="/payment" element={<Payment />} />
          {/*Seller*/}
          <Route path="/sellerLogin" element={<SellerLogin />} />
          <Route path="/sellerRequestAccount" element={<SellerAccountRequest />} />
          <Route path="/sellerDash" element={<SellerDash />} />
          <Route path="/sellerAddProduct" element={<AddProduct />} />
          <Route path="/sellerUpdateProduct/:id" element={<UpdateProduct />} />
          {/*Admin*/}
          <Route path="/updateSeller/:id" element={<UpdateSellerProfile />} />
          <Route path="/sellerRequests" element={<SellerRequest />} />
          <Route path="/adminAddProduct" element={<AddProductAdmin />} />
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/adminUpdateProduct/:id" element={<UpdateProductAdmin />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          {/*Blog Management*/}
          <Route path="/allBlog" element={<AllBlog />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/updateBlog/:id" element={<UpdateBlog />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;