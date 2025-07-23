import React, { useState } from 'react';
import axios from 'axios';
import LogCard from './img/reg.png'
function BuyerRegister() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!formData.email) {
            alert("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Email is invalid");
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/buyer', formData);
            alert('Registration successful!');
            window.location.href = '/';
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === "Email already exists") {
                alert('Email is already registered.');
            } else {
                console.error(error);
                alert('Registration failed!');
            }
        }
    };

    return (
        <div className='continer_card_auth'>
            <div className='card_auth_reg'>
                <div className='card_auth_section'>
                    <div className='card_auth_con_reg'>
                        <div>
                            <p className='card_auth_topic_righ'>Village Boom</p>
                            <p className='card_auth_pera'>"Join VillageBoom! Turn talents into earnings. Register now and start selling today."</p>
                        </div>
                        <img src={LogCard} alt="Logo" className='card_auth_img_reg' />
                    </div>
                </div>
                <div className='card_auth_section'>
                    <div className='card_auth_section_lft'>
                        <p className='card_auth_topic_logo'>Join VillageBoom</p>
                        <form onSubmit={handleSubmit} className='auth_from_reg'>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="fullName">Full Name</label>
                                <input
                                    className='from_input'
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => {
                                        const re = /^[A-Za-z\s]*$/;
                                        if (re.test(e.target.value)) {
                                            handleChange(e);
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className='from_two_con'>
                                <div className='from_auth_input_con'>
                                    <label className='from_lable' htmlFor="email">Email</label>
                                    <input
                                        className='from_input'
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='from_auth_input_con'>
                                    <label className='from_lable' htmlFor="password">Password</label>
                                    <input
                                        className='from_input'
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="phone">Phone</label>
                                <input
                                    className='from_input'
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]{0,10}$/;
                                        if (re.test(e.target.value)) {
                                            handleChange(e);
                                        }
                                    }}
                                    maxLength="10"
                                    pattern="[0-9]{10}"
                                    title="Please enter exactly 10 digits."
                                />
                            </div>
                            <div className='from_auth_input_con'>
                                <label className='from_lable' htmlFor="address">Address</label>
                                <textarea
                                    className='from_input'
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                />
                            </div>
                            <button type="submit" className='auth_btn_fom'>Register</button>
                            <div className='from_line'></div>
                            <p className='noaccc'>
                                Already have an account?{" "}
                                <span
                                    className='noccc_link'
                                    onClick={() => (window.location.href = "/")}
                                >
                                    Login here
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerRegister;
