import React, { useState } from 'react';
import LogCard from './img/admin.jpg'
function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      alert('Login successful');
      window.location.href = '/adminDash';
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='continer_card_auth'>
      <div className='card_auth'>
        <div className='card_auth_section'>
          <div className='card_auth_con'>
            <div>
              <p className='card_auth_topic_righ'>Admin Login</p>
              <p className='card_auth_pera'>Access your dashboard to manage sellers, products, and empower village growth.</p>
            </div>
            <img src={LogCard} alt="Logo" className='card_auth_img' />
          </div>
        </div>
        <div className='card_auth_section'>
          <div className='card_auth_section_lft'>
            <p className='card_auth_topic_logo'>Welcome back Admin</p>
            <div className='auth_from'>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="username">User Name</label>
                <input
                  className='from_input'
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='from_auth_input_con'>
                <label className='from_lable' htmlFor="Password">Password</label>
                <input
                  className='from_input'
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className='auth_btn_fom' onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
