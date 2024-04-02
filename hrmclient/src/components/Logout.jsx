// Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove access token from local storage
    localStorage.removeItem('token');

    // Navigate user to the login page

    navigate('/login');
    Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'Redirecting...'
    })

  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
