import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateSellerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/seller/${id}`);
        setFormData(response.data.seller);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        alert('Failed to fetch seller data.');
      }
    };
    fetchSeller();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/seller/${id}`, formData);
      alert('Seller profile updated successfully!');
      navigate('/sellerRequests');
    } catch (error) {
      console.error('Error updating seller profile:', error);
      alert('Failed to update seller profile.');
    }
  };

  return (
    <div className='continer_full'>
      <div className='manage_Nav_full'>
        <div className='manage_Nav'>
          <p className='manage_Nav_logo'>Admin dashboard</p>
          <div className='manage_Nav_con'>
            <p className='manage_Nav_con_item ' onClick={() => (window.location.href = '/adminDash')}>Product</p>
            <p className='manage_Nav_con_item manage_Nav_con_item_active' onClick={() => (window.location.href = '/sellerRequests')}>Seller</p>
            <p className='manage_Nav_con_item' onClick={() => (window.location.href = '/adminLogin')}>LogOut</p>
          </div>
        </div>
      </div>
      <div className='continer'>
        <div className='continer_sub'>
          <p className='from_topic'>Update Seller Profile</p>
          <form onSubmit={handleSubmit} className='data_from'>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="fullName">Full Name</label>
              <input
                className='from_input'
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="email">Email</label>
              <input
                className='from_input'
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="phone">Phone</label>
              <input
                className='from_input'
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="address">Address</label>
              <textarea
                className='from_input'
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="category">Category</label>
              <select name="category" value={formData.category} className='from_input' onChange={handleChange} required>
                <option value="" disabled selected>Select a category</option>
                <option value="Handcrafts">Handcrafts</option>
                <option value="Organic foods">Organic foods</option>
                <option value="Eco-friendly items">Eco-friendly items</option>
                <option value="Ayurvedic products">Ayurvedic products</option>
                <option value="Endamic animal species">Endamic animal species</option>
                <option value="Endamic plants">Endamic plants</option>
              </select>
            </div>
            <div className='from_auth_input_con'>
              <label className='from_lable' htmlFor="status">Status</label>
              <select
                className='from_input'
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button className='auth_btn_fom' type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSellerProfile;
