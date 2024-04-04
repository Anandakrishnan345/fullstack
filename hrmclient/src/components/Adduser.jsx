
import React, { useState,useEffect } from 'react';
import './Newadduser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import checkToken from './CheckToken';
import BASE_URL from './Baseurl';
// import { validateEmail, validatePassword, validatePhoneNumber, validateAddress, validatePincode } from './ValidationRules';
function Adduser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [Address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  checkToken()

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const validators = {
    name: (value) => {
      if (!value.trim()) {
        return 'Name is required';
      } else if (value.length < 3 || value.length > 30) {
        return 'Name should be between 3 and 30 characters';
      } else if (!/^[A-Za-z]+$/.test(value)) {
        return 'Name should not contain numbers or special characters';
      }
      return '';
    },
    email: (value) => {
      if (!value.trim()) {
        return 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return 'Invalid email address';
      }
      return '';
    },
    // password: (value) => {
    //   if (!value.trim()) {
    //     return 'Password is required';
    //   } else if (value.length < 6) {
    //     return 'Password must be at least 6 characters';
    //   }
    //   return '';
    // },
    phonenumber: (value) => {
      if (!value.trim()) {
        return 'Phone number is required';
      } else if (!/^\d{10}$/.test(value)) {
        return 'Invalid phone number';
      }
      return '';
    },
    Address: (value) => {
      if (!value.trim()) {
        return 'Address is required';
      }
      return '';
    },
    pincode: (value) => {
      if (!value.trim()) {
        return 'Pincode is required';
      } else if (!/^\d{6}$/.test(value)) {
        return 'Invalid pincode';
      }
      return '';
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validators[name](value);

    setErrors({ ...errors, [name]: error });
    // Directly update state based on the input name
    name === 'name' && setName(value);
    name === 'email' && setEmail(value);
    // name === 'password' && setPassword(value);
    name === 'phonenumber' && setPhonenumber(value);
    name === 'Address' && setAddress(value);
    name === 'pincode' && setPincode(value);
  };

  const handleAdduser = async (e) => {
    try {
      
    e.preventDefault();

    // Final validation before submitting the form
    const newErrors = {};

    // Add final validation checks similar to your existing logic

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
   
    
      // Make an API request to add the user
      const response = await axios.post(
        `${BASE_URL}:3000/adduser`,
        {
          name,
          email,
          // password,
          phonenumber,
          Address,
          pincode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("reached here...");
      console.log("success",response.data.success);

      if (response.data.success) {
        alert(response.data.message);
        navigate('/getuser');
        return;
      } else {
        alert(response.data.message);
        return;
      }



    } catch (error) {
      console.error('Adding user failed:', error);
      alert(error.response.data.message);
    }
  };

  return (
  

    
    <div className="wrapper_add">
      
      <form className="form" onSubmit={handleAdduser}>
      <h2 className="titleuser">Add User</h2>
        <label htmlFor="name">Enter your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
        <span className="error-message">{errors.name}</span>

        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <span className="error-message">{errors.email}</span>

        <label htmlFor="phonenumber">Enter Your Phone Number</label>
        <input
          type="text"
          placeholder="Enter Your Phone Number"
          name="phonenumber"
          value={phonenumber}
          onChange={handleInputChange}
          required
        />
        <span className="error-message">{errors.phonenumber}</span>

        <label htmlFor="address">Enter Your Address</label>
        <input
          type="text"
          placeholder="Enter Your Address"
          name="Address"
          value={Address}
          onChange={handleInputChange}
          required
        />
        <span className="error-message">{errors.Address}</span>

        <label htmlFor="pincode">Enter Your Pincode</label>
        <input
          type="text"
          placeholder="Enter Your pincode"
          name="pincode"
          value={pincode}
          onChange={handleInputChange}
          required
        />
        <span className="error-message">{errors.pincode}</span>

        <div className="adduser">
          <button className="adduser-button" type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
}

export default Adduser;
