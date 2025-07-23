import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './cart.css'
import Nav from '../../Components/NavBar/Nav';
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
function AddToCart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            alert("User not logged in!");
            window.location.href = "/";
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/cart?userID=${userID}`);
                const filteredCartItems = response.data.cart.filter(item => item.userID === userID);
                setCartItems(filteredCartItems);
                calculateTotalPrice(filteredCartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                alert("Failed to fetch cart items.");
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
        setTotalPrice(total);
    };

    const handleQuantityChange = async (itemID, newQuantity) => {
        if (newQuantity <= 0) {
            alert("Quantity must be greater than 0!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8081/cart/${itemID}`, { cartQuantity: newQuantity });
            if (response.status === 200) {
                const updatedItems = cartItems.map((item) =>
                    item._id === itemID ? { ...item, cartQuantity: newQuantity } : item
                );
                setCartItems(updatedItems);
                calculateTotalPrice(updatedItems);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert("Failed to update quantity. Please try again.");
        }
    };

    const handleDelete = async (itemID) => {
        try {
            const response = await axios.delete(`http://localhost:8081/cart/${itemID}`);
            if (response.status === 200) {
                const updatedItems = cartItems.filter((item) => item._id !== itemID);
                setCartItems(updatedItems);
                calculateTotalPrice(updatedItems);
                alert("Item deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Please try again.");
        }
    };

    const handleDownloadAllAsImage = async () => {
        const cartContainer = document.getElementById('cart-items-container');
        if (!cartContainer) {
            alert("Failed to find the cart items container.");
            return;
        }

        try {

            const clonedContainer = cartContainer.cloneNode(true);

            const cards = clonedContainer.querySelectorAll('div');
            cards.forEach(card => {

            });

            document.body.appendChild(clonedContainer);

            const canvas = await html2canvas(clonedContainer, {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                logging: true,
            });

            document.body.removeChild(clonedContainer);

            const link = document.createElement('a');
            link.download = 'cartitems.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Error downloading cart items as image:", error);
            alert("Failed to download cart items as image.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (cartItems.length === 0) {
        return <div>
            <Nav />
            <p className='no_item'>No items in the cart.</p>
        </div>;
    }

    return (
        <div>
            <Nav />
            <div className='continer_full'>
                <div className='continer'>
                    <div className='product_view_container_cart'>
                        <div className='section_cart'>
                            <div className='section_maincart'>
                                <p className='topic_main'>Cart</p>
                                <FaDownload onClick={handleDownloadAllAsImage} className='dwonbtn' />
                            </div>
                            <div
                                id="cart-items-container"
                                className='cart_items_container'
                            >
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className='cart_card'

                                    >
                                        <div className='img_container_cart'>
                                            {item.imgURLs.length > 0 && (
                                                <img
                                                    src={`http://localhost:8081/uploads/${item.imgURLs[0]}`}
                                                    alt="Product"
                                                    className='cart_img'

                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p className='pro_name'>{item.productName}</p>
                                            <p className='price_cart'>${item.price}</p>


                                            <div className='cart_actionset'>
                                                <input
                                                    className='qty_inn'
                                                    type="number"
                                                    value={item.cartQuantity}
                                                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                                    min="1"

                                                />
                                                <MdDelete
                                                    className='cart_delt'
                                                    onClick={() => handleDelete(item._id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='section_cart'>
                            <div className='cart_sum_box'>
                                <p className='cart_sum_box_topic'>Summary</p>
                                <div className='cart_sum_box_flx'>
                                    <p className='cart_sum_box_pricenm'>Estimated total
                                    </p>
                                    <p className='cart_sum_box_pricenm'>
                                        ${totalPrice.toFixed(2)}</p>
                                </div>
                                <br />
                                <button onClick={() => (window.location.href = `/payment?total=${totalPrice}`)} className='btn_ceh'>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AddToCart;
