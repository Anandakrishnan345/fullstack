// import React, { useState } from 'react';
// import './Adduser.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';



// function Adduser  () {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
//     const [phonenumber, setPhonenumber] = useState('');
//     const [Address, setAddress] = useState('');
//     const [pincode, setPincode] = useState('');
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});// validation error

//     const handleAdduser = async (e) => {
//         e.preventDefault();

//         const newErrors = {};
//         // validation

//         if (!name.trim()) {
//             newErrors.name = 'Name is required';
//           } else if (name.length < 3 || name.length > 30) {
//             newErrors.name = 'Name should be between 3 and 30 characters';
//           } else if (!/^[A-Za-z\s]+$/.test(name)) {
//             newErrors.name =
//               'Name should not contain numbers or special characters';
//           }

//           if (!email.trim()) {
//             newErrors.email = 'Email is required';
//           } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Invalid email address';
//           }

//           if (!password.trim()) {
//             newErrors.password = 'Password is required';
//           } else if (password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//           }

//           if (!phonenumber.trim()) {
//             newErrors.phonenumber = 'Phone number is required';
//           } else if (!/^\d{10}$/.test(phonenumber)) {
//             newErrors.phonenumber = 'Invalid phone number';
//           }

//           if (!Address.trim()) {
//             newErrors.Address = 'Address is required';
//           }

//           if (!pincode.trim()) {
//             newErrors.pincode = 'Pincode is required';
//           } else if (!/^\d{6}$/.test(pincode)) {
//             newErrors.pincode = 'Invalid pincode';
//           }

//           if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//           }

//         try {

//             const data = { name, email, password, phonenumber, Address, pincode };
//             const json_data = JSON.stringify(data);
//             console.log("json_data : ", json_data)

//             const response = await axios.post('http://localhost:3000/adduser', {
//                 name:name,
//                 email: email,
//                 password: password,
//                 phonenumber:phonenumber,
//                 Address:Address,
//                 pincode:pincode},
//                 {

//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: json_data,
//             });
            
//             console.log('Response received:', response);


//             if (response.data.success) {
                
//                 alert(response.data.message);
//                 navigate('/getuser');
               
                
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Adding user failed:', error);
//             alert(error.response.data)
//         }
//     }

   

//     return (
//         <div className='wrapper_add' >
          
//             <h2 className='titleuser'>Adduser</h2>
//             <form className='wrap-item' onSubmit={handleAdduser}>
//                 <label htmlFor="name">Enter your Name</label>
//                 <input type="text" placeholder="Enter your name" name='name' value={name} onChange={(e) => setName(e.target.value)} required/>
//                 <span className='error-message'>{errors.name}</span> 
               
//                 <label htmlFor="name">Enter your email</label>
//                 <input type="text" placeholder="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <span className='error-message'>{errors.email}</span>
               
//                 <label htmlFor="password">Enter Your Password</label>
//                 <input type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
//                 <span className='error-message'>{errors.password}</span>
                
//                 <label htmlFor="phonenumber">Enter Your Phone Number</label>
//                 <input type="text" placeholder="Enter Your Phone Number" name="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required/>
//                 <span className='error-message'>{errors.phonenumber}</span>

//                 <label htmlFor="address">Enter Your Address</label>
//                 <input type="address" placeholder="Enter Your Address" name="Address" value={Address} onChange={(e) => setAddress(e.target.value)} required/>
//                 <span className='error-message'>{errors.Address}</span>

//                 <label htmlFor="pincode">Enter Your Pincode</label>
//                 <input type="pincode" placeholder="Enter Your pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required/>
//                 <span className='error-message'>{errors.pincode}</span>
//                 <div className='adduser'>
//                 <button type="submit">Adduser</button>
                
//                 </div>
                
//             </form>
//         </div>
//     );
// };

// export default Adduser;
import React, { useState,useEffect } from 'react';
import './Newadduser.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import checkToken from './CheckToken';
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
        'http://localhost:3000/adduser',
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
    // <div className='wrapper_add'>
    //   <h2 className='titleuser'>Adduser</h2>
    //   <form className='wrap-item' onSubmit={handleAdduser}>
    //     <label htmlFor='name'>Enter your Name</label>
    //     <input
    //       type='text'
    //       placeholder='Enter your name'
    //       name='name'
    //       value={name}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <span className='error-message'>{errors.name}</span>

    //     <label htmlFor='email'>Enter your email</label>
    //     <input
    //       type='text'
    //       placeholder='email'
    //       name='email'
    //       value={email}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <span className='error-message'>{errors.email}</span>

        

    //     <label htmlFor='phonenumber'>Enter Your Phone Number</label>
    //     <input
    //       type='text'
    //       placeholder='Enter Your Phone Number'
    //       name='phonenumber'
    //       value={phonenumber}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <span className='error-message'>{errors.phonenumber}</span>

    //     <label htmlFor='address'>Enter Your Address</label>
    //     <input
    //       type='address'
    //       placeholder='Enter Your Address'
    //       name='Address'
    //       value={Address}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <span className='error-message'>{errors.Address}</span>

    //     <label htmlFor='pincode'>Enter Your Pincode</label>
    //     <input
    //       type='pincode'
    //       placeholder='Enter Your pincode'
    //       name='pincode'
    //       value={pincode}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <span className='error-message'>{errors.pincode}</span>

    //     <div className='adduser'>
    //       <button type='submit'>Adduser</button>
    //     </div>
    //   </form>
    // </div>
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
