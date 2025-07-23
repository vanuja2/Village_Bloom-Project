import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import axios from 'axios';
import Logo from './img/logo.png';
import './nav.css';
import './user.css';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
function Nav() {
    const currentPath = window.location.pathname;
    const [showProfileCard, setShowProfileCard] = useState(false);
    const [buyerData, setBuyerData] = useState(null);

    useEffect(() => {
        const fetchBuyerData = async () => {
            const userID = localStorage.getItem('userID');
            if (!userID) {
                console.error('No user logged in!');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/buyer/${userID}`);
                setBuyerData(response.data.buyer);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchBuyerData();
    }, []);

    const toggleProfileCard = () => {
        setShowProfileCard(!showProfileCard);
    };

    const handleUpdate = () => {
        const userID = localStorage.getItem('userID');
        window.location.href = `/updateBuyerProfile/${userID}`;
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (!confirmDelete) {
            return;
        }

        const userID = localStorage.getItem('userID');
        try {
            await axios.delete(`http://localhost:8081/buyer/${userID}`);
            alert('Account deleted successfully!');
            localStorage.removeItem('userID');
            window.location.href = '/';
        } catch (error) {
            console.error('Failed to delete account:', error);
            alert('Failed to delete account.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userID');
        alert('Logged out successfully!');
        window.location.href = '/';
    };

    return (
        <div className='continer_full_nav'>
            <div className='continer'>
                <div className='continer_sub'>
                    <div className='nav_var_user'>
                        <img src={Logo} alt="Logo" className='nav_var_logo' onClick={() => (window.location.href = '/home')} />
                        <div className='nav_var_user_item_con'>
                            <p className={`nav_var_user_item ${currentPath === '/home' ? 'nav_var_user_item_active' : ''}`} onClick={() => (window.location.href = '/home')}>home</p>
                            <p className={`nav_var_user_item ${currentPath === '/productHome' ? 'nav_var_user_item_active' : ''}`} onClick={() => (window.location.href = '/productHome')}>Product</p>
                            <p className={`nav_var_user_item ${currentPath === '/allBlog' ? 'nav_var_user_item_active' : ''}`} onClick={() => (window.location.href = '/allBlog')}>Blog</p>
                            <IoMdCart className='nav_var_user_item_icon' onClick={() => (window.location.href = '/addtoCart')} />
                            <div className='profile_icon_container'>
                                <CgProfile className='nav_var_user_item_icon' onClick={toggleProfileCard} />
                                {showProfileCard && buyerData && (
                                    <div className='profile_card'>
                                        <p><strong>Full Name:</strong> {buyerData.fullName}</p>
                                        <p><strong>Email:</strong> {buyerData.email}</p>
                                        <p><strong>Phone:</strong> {buyerData.phone}</p>
                                        <p><strong>Address:</strong> {buyerData.address}</p>
                                        <div className='btn_action_con'>
                                            <button className='profile_card_button' onClick={handleUpdate}><GrUpdate /></button>
                                            <button className='profile_card_button' onClick={handleDelete}><MdDelete /></button>
                                            <button className='profile_card_button' onClick={handleLogout} ><IoLogOut /></button>
                                        </div>
                                    </div>
                                )}
                                {showProfileCard && !buyerData && (
                                    <div className='profile_card'>
                                        <p>Loading...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;
