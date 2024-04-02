// import React from "react";
// import { Link } from "react-router-dom";
// import Adminimage from"./images/man.png"
// function AdminOnline(){
//     return(
//         <>
//         <div className="ctn" style={{ margin: "auto", display: "flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"3px" }}>
//           <img src={Adminimage} alt="" width={80} style={{paddingTop:"10px"}}/>
//           <h2 style={{marginTop:"-5px"}}>Admin</h2>
//         <Link to={"/adduser"} ><button>Adduser</button></Link>
//         <Link to={"/getuser"} ><button>Getuser</button></Link>
//         </div>
//         </>
      
        
//     )
// }
// export default AdminOnline
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import Adminimage from './images/man.png';
import './Adminonline.css';
import Logout from './Logout';
import checkToken from './CheckToken';

function AdminOnline() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  checkToken();

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to access user ID
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.user_id) {
        setUserId(decodedToken.user_id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user details using user ID
        const response = await axios.get(`http://localhost:3000/viewuser/${userId}`);
        console.log("response",response)
        setUser(response.data); // Assuming response contains user details
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);
  console.log("user",user)

  return (
    <>
      <div className="ctn" style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '3px' }}>
        <img src={Adminimage} alt="" width={80} style={{ paddingTop: '10px' }} className='admin-image'/>
        <h2 style={{ marginTop: '-5px' ,padding:'10px'}}>Admin</h2>
        {user ? (
          <>
            {/* <p>User ID: {userId}</p> */}
            <p className='admin-details adminname'>User Name: {user.data.name}</p>
            <p className='admin-details adminemail'>User Email: {user.data.email}</p>
            
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/adduser"><button className='admin-button'>Add User</button></Link>
        <Link to="/getuser"><button className='admin-button'>Get User</button></Link>
        <Logout/>
      </div>
    </>
  );

  
}

export default AdminOnline;