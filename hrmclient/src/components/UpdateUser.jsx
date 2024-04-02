
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams,useNavigate } from 'react-router-dom';
// import './UpdateUser.css' ;
// import Swal from 'sweetalert2';

// function ViewAndUpdateUser() {
//     const { id } = useParams();
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const [updatedUser, setUpdatedUser] = useState({
//         name: '',
//         email: '',
//         phonenumber: '',
//         Address: '',
//         pincode: ''
//     });

//     // Function to fetch user details
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/viewuser/${id}`);
//                 setUser(response.data.data);
//                 // Set default values for updatedUser state when user data is fetched
//                 setUpdatedUser({
//                     name: response.data.data.name,
//                     email: response.data.data.email,
//                     phonenumber: response.data.data.phonenumber,
//                     Address: response.data.data.Address,
//                     pincode: response.data.data.pincode
//                 });
//             } catch (error) {
//                 console.error('Failed to fetch user:', error.message);
//             }
//         };
//         fetchUser();
//     }, [id]);

//     // Function to handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedUser({ ...updatedUser, [name]: value });
//     };

//     // Function to update user details
//     const updateUser = async () => {
//         try {
//             const response = await axios.put(`http://localhost:3000/update/${id}`, updatedUser);
//             console.log('User details updated successfully:', response.data.message);
//             if(response.data.data.user_type==='65eecbcb18357aefe2c8f15c'){
//                 navigate('/login')
//             }
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success',
//                 text:  response.data.message,
               
//             })
            
//             // Optionally, you can update the user state with the updated data
//             setUser(response.data.data);
//         } catch (error) {
//             console.error('Failed to update user details:', error.message);
//         }
//     };

  
    
    
    

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className='update-user'>
//             {/* <h2>User Details</h2>
//             <div>Name: {user.name}</div>
//             <div>Email: {user.email}</div>
//             <div>Phone Number: {user.phonenumber}</div>
//             <div>Address: {user.Address}</div>
//             <div>Pincode: {user.pincode}</div> */}
//             <h2 className='heading'>Update User</h2>
//             <input className='update-input' type="text" name="name" value={updatedUser.name} onChange={handleInputChange} placeholder="Name" />
//             <input className='update-input' type="email" name="email" value={updatedUser.email} onChange={handleInputChange} placeholder="Email" />
//             <input className='update-input' type="text" name="phonenumber" value={updatedUser.phonenumber} onChange={handleInputChange} placeholder="Phone Number" />
//             <input className='update-input' type="text" name="Address" value={updatedUser.Address} onChange={handleInputChange} placeholder="Address" />
//             <input className='update-input' type="text" name="pincode" value={updatedUser.pincode} onChange={handleInputChange} placeholder="Pincode" />
//             <button className='update-button' onClick={updateUser}>Update User</button>
//         </div>
//     );
// }

// export default ViewAndUpdateUser;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
 // Import jwtDecode
import './UpdateUser.css';
import Swal from 'sweetalert2';
import checkToken from './CheckToken';

function ViewAndUpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        phonenumber: '',
        Address: '',
        pincode: ''
    });
    checkToken();

    // Function to fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/viewuser/${id}`);
                setUser(response.data.data);
                // Set default values for updatedUser state when user data is fetched
                setUpdatedUser({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    phonenumber: response.data.data.phonenumber,
                    Address: response.data.data.Address,
                    pincode: response.data.data.pincode
                });
            } catch (error) {
                console.error('Failed to fetch user:', error.message);
            }
        };
        fetchUser();
    }, [id]);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    // Function to update user details
    const updateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/update/${id}`, updatedUser);
            console.log('User details updated successfully:', response.data.message);

            // Decode JWT token and get user_type
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userType = decodedToken.user_type;
            console.log('userType',userType);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text:  response.data.message,
            }).then(()=>{
                     // Navigate based on user_type
            if (userType === 'employee') { // Employee
                navigate(`/employee/${user._id}`);
            } else if(userType === 'admin'){
                navigate(`/admin/${user._id}`);
            }
            })

           

            
          

            // Optionally, you can update the user state with the updated data
            setUser(response.data.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'oops',
                text:  error.response.data.message,
            })
            console.error('Failed to update user details:', error.response);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='update-user'>
            <h2 className='heading'>Update User</h2>
            <input className='update-input' type="text" name="name" value={updatedUser.name} onChange={handleInputChange} placeholder="Name" />
            <input className='update-input' type="email" name="email" value={updatedUser.email} onChange={handleInputChange} placeholder="Email" />
            <input className='update-input' type="text" name="phonenumber" value={updatedUser.phonenumber} onChange={handleInputChange} placeholder="Phone Number" />
            <input className='update-input' type="text" name="Address" value={updatedUser.Address} onChange={handleInputChange} placeholder="Address" />
            <input className='update-input' type="text" name="pincode" value={updatedUser.pincode} onChange={handleInputChange} placeholder="Pincode" />
            <button className='update-button' onClick={updateUser}>Update User</button>
        </div>
    );
}

export default ViewAndUpdateUser;
