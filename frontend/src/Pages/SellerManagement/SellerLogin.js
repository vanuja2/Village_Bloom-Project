import React, { useState } from 'react';
import axios from 'axios';
import LogCard from './img/seller.webp'
function SellerLogin() {
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
      const response = await axios.post('http://localhost:8081/seller/login', formData);
      const sellerStatus = response.data.seller.status;

      if (sellerStatus === "Approved") {
        alert('Login successful!');
        localStorage.setItem('sellerID', response.data.seller._id);
        window.location.href = '/sellerDash';
      } else if (sellerStatus === "Pending") {
        alert('Your request is pending now. Please try again after a short time.');
      } else if (sellerStatus === "Rejected") {
        alert('Your account is rejected due to some privacy reasons. Please request a new account with correct details.');
        window.location.href = '/sellerRequestAccount';
      }
    } catch (error) {
      console.error(error);
      alert('Login failed! Invalid email or password.');
    }
  };

  return (
    <div className='continer_card_auth'>
      <div className='card_auth'>
        <div className='card_auth_section'>
          <div className='card_auth_con'>
            <div>
              <p className='card_auth_topic_righ'>Seller Login</p>
              <p className='card_auth_pera'>Manage your products, track sales, and grow your village income.</p>
            </div>
            <img src={LogCard} alt="Logo" className='card_auth_img' />
          </div>
        </div>
        <div className='card_auth_section'>
          <div className='card_auth_section_lft'>
            <p className='card_auth_topic_logo'>Welcome back Seller</p>
            <form className='auth_from' onSubmit={handleSubmit}>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="email">Email</label>
                <input className='from_input' type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="password">Password</label>
                <input className='from_input' type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>
              <button className='auth_btn_fom' >Login</button>
              <div className='from_line'></div>
              <p className='noaccc'>
                Don't Have Account {" "}
                <span
                  className='noccc_link'
                  onClick={() => (window.location.href = "/sellerRequestAccount")}
                >
                  Request
                </span> 
                {" "} Account
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;
