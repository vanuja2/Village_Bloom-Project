import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './product.css'
import Nav from '../../Components/NavBar/Nav';

function SingalProductView() {
    const { state } = useLocation();
    const product = state?.product;
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0); // Track which image is selected

    if (!product) {
        return <div>No product data available</div>;
    }

    const handleAddToCart = async () => {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            alert("User not logged in!");
            return;
        }

        if (quantity <= 0) {
            alert("Quantity must be greater than 0!");
            return;
        }

        if (quantity > product.quantity) {
            alert(`Quantity cannot exceed available stock (${product.quantity})!`);
            return;
        }

        try {
            const existingCartResponse = await axios.get(`http://localhost:8081/cart?userID=${userID}`);
            const existingCart = existingCartResponse.data.cart;

            const isItemInCart = existingCart.some(
                (item) => item.productName === product.productName && item.userID === userID
            );

            if (isItemInCart) {
                alert("Item is already in the cart!");
                return;
            }

            const response = await axios.post("http://localhost:8081/cart", {
                userID,
                productName: product.productName,
                price: product.price,
                description: product.description,
                category: product.category,
                imgURLs: product.imgURLs,
                cartQuantity: quantity,
            });
            alert("Product added to cart successfully!");
            window.location.href = "/addtoCart";
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart.");
        }
    };

    return (
        <div>
            <Nav />
            <div className='continer_full'>
                <div className='continer'>
                    <div className="product_view_container">

                        <div className='product_view_sub_container'>
                            <div className="product_images_con">
                                {/* Main image preview */}
                                <div className='img_privew_con'>
                                    <img
                                        src={`http://localhost:8081/uploads/${product.imgURLs[selectedImage]}`}
                                        alt={`Product ${selectedImage + 1}`}
                                        className="main_preview_image"
                                    />
                                </div>

                                {/* Thumbnail images */}
                                <div className="thumbnail_container">
                                    {product.imgURLs.map((url, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:8081/uploads/${url}`}
                                            alt={`Product ${index + 1}`}
                                            className={`thumbnail_image ${selectedImage === index ? 'selected' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className='product_view_details'>
                                <p className="view_product_name">{product.productName}</p>
                                <p className="view_product_description">{product.description}</p>
                                <p className="view_product_description">Available Quantity: {product.quantity}</p>
                                <p className="view_product_price">${product.price}</p>
                                <div className="view_cart_section">
                                    <button className='btn_action' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                                    <input
                                        type="number"
                                        className='input_qty'
                                        value={quantity}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value > 0 && value <= product.quantity) {
                                                setQuantity(value);
                                            }
                                        }}
                                        min="1"
                                        max={product.quantity}
                                    />
                                    <button className='btn_action' onClick={() => setQuantity(quantity + 1 <= product.quantity ? quantity + 1 : quantity)}>+</button>

                                </div>
                                <button onClick={handleAddToCart} className='add_cart_btn'>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingalProductView;