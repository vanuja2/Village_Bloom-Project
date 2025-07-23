import React, { useState } from 'react';
import axios from 'axios';
import './buyer.css'
import LogCard from './img/logCover.png'
import RoundLogo from './img/LogoRound.png'
function BuyerLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/buyer/login', formData);
            alert('Login successful!');
            localStorage.setItem('userID', response.data.buyer._id);
            window.location.href = '/home';
        } catch (error) {
            console.error(error);
            alert('Login failed! Invalid email or password.');
        }
    };

    return (
        <div>
            <div className='continer_card_auth'>
                <div className='card_auth'>
                    <div className='card_auth_section'>
                        <div className='card_auth_con'>
                            <div>
                                <p className='card_auth_topic_righ'>Village Boom</p>
                                <p className='card_auth_pera'>"Login to VillageBoom! Sell your crafts, grow your income, and uplift your village. Every skill counts!"</p>
                            </div>
                            <img src={LogCard} alt="Logo" className='card_auth_img' />
                        </div>
                    </div>
                    <div className='card_auth_section'>
                        <div className='card_auth_section_lft'>

                            <p className='card_auth_topic_logo'>Welcome back</p>
                            <form onSubmit={handleSubmit} className='auth_from'>
                                <div className='from_auth_input_con'>
                                    <label className='from_lable' htmlFor="email">Email</label>
                                    <input className='from_input' type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className='from_auth_input_con'>
                                    <label className='from_lable' htmlFor="password">Password</label>
                                    <input className='from_input' type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                </div>
                                <button type="submit" className='auth_btn_fom'>Login</button>
                                <div className='from_line'></div>
                                <p className='noaccc'>
                                    Don't Have Account {" "}
                                    <span
                                        className='noccc_link'
                                        onClick={() => (window.location.href = "/buyerRegister")}
                                    >
                                        Register
                                    </span>
                                </p>
                                <div className='from_admin_action'>
                                    <p className='from_admin_action_btn' onClick={() => (window.location.href = '/adminLogin')}>Admin</p>
                                    <p className='from_admin_action_btn' onClick={() => (window.location.href = '/sellerLogin')}>Seller</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    );
}

export default BuyerLogin;
