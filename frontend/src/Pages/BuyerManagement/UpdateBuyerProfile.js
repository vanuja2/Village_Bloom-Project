import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../Components/NavBar/Nav';

function UpdateBuyerProfile() {
  const { id } = useParams(); // Get user ID from URL
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/buyer/${id}`);
        setFormData(response.data.buyer);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch user data.');
      }
    };

    fetchBuyerData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/buyer/${id}`, formData);
      alert('Profile updated successfully!');
      navigate('/home'); // Redirect to profile page
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div>
      <Nav />
      <br/> <br/> <br/> <br/>
      <div className='continer_full'>
        <div className='continer'>
          <div className='continer_sub'>
            <p className='from_topic'>Update Buyer Profile</p>
            <form onSubmit={handleSubmit} className='data_from'>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="fullName">Full Name</label>
                <input
                  className='from_input'
                  type="text"
                  id="fullName"
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
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="password">Password</label>
                <input
                  className='from_input'
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="phone">Phone</label>
                <input
                  className='from_input'
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  className='from_input'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='auth_btn_fom' type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBuyerProfile;
