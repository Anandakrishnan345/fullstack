// tokenCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const checkToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You need to be logged in to access this page!',
            
             
            
          }).then(() => {
            navigate('/login');
          });
    }
  }, [navigate]);
};

export default checkToken;
