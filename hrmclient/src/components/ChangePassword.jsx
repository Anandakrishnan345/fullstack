



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Changepassword.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import checkToken from './CheckToken';
import BASE_URL from './Baseurl';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

 checkToken();

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(`${BASE_URL}:3000/changepassword/${email}`, {
        oldPassword,
        newPassword
      });
      console.log('response', response.data.message);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.err
      });
    }
  };

  return (
    <div className="main">
      <div className="change-password-container">
        <h2>Change Password</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Old Password:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;

