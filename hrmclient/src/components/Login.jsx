// import React, { useState } from 'react';
// import './Login.css'

// import { Link ,useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'
// import axios from 'axios';



// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});// validation error


//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const newErrors = {};
//       if (!email.trim()) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(email)) {
//         newErrors.email = 'Invalid email address';
//       }
//       if (!password.trim()) {
//         newErrors.password = 'Password is required';
//       } else if (password.length < 6) {
//         newErrors.password = 'Password must be at least 6 characters';
//         }
//       if (Object.keys(newErrors).length > 0) {
//           setErrors(newErrors);
//          return;
//         }

//       try {
//           const response = await axios.post('http://localhost:3000/login', {
//               email: email,
//               password: password
//           }, {
//               method: "POST",
//               headers: {
//                   'Content-Type': 'application/json'
//               }
//           });



//           if (response.data.success) {
//               const token = response.data.data;
//               localStorage.setItem('token', token);
//               // navigate('/admin');
//               // alert(response.data.message);

//               Swal.fire({
//                 icon: "success",
//                 text: response.data.message,
//                 showClass: {
//                   popup: `
//                     animate__animated
//                     animate__fadeInUp
//                     animate__faster
//                   `
//                 },
//                 hideClass: {
//                   popup: `
//                     animate__animated
//                     animate__fadeOutDown
//                     animate__faster
//                   `
//                 }
//               }).then(()=>{navigate('/admin')})

//               return;
//           } else {
//               // alert(response.data.message);
//               Swal.fire({
//                 icon: "error",
//                 text: response.data.message,
//                 showClass: {
//                   popup: `
//                     animate__animated
//                     animate__fadeInUp
//                     animate__faster
//                   `
//                 },
//                 hideClass: {
//                   popup: `
//                     animate__animated
//                     animate__fadeOutDown
//                     animate__faster
//                   `
//                 }
//               });
//               return;
//           }


//       } catch (error) {
//           console.error('Login failed:', error);
//           // alert(error.response.data.message);
//           Swal.fire({
//             icon: "error",
//             text: error.response.data.message,
//             showClass: {
//               popup: `
//                 animate__animated
//                 animate__fadeInUp
//                 animate__faster
//               `
//             },
//             hideClass: {
//               popup: `
//                 animate__animated
//                 animate__fadeOutDown
//                 animate__faster
//               `
//             }
//           });
//       }
//   };



//     return (
//         <div className='wrapper' >


//             <form className='wrap-item' onSubmit={handleSubmit}>
//             <h2 className='title'>Login</h2>
//                 <label htmlFor="name">Enter your email</label>
//                 <input type="email" placeholder="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <span className='error-message'>{errors.email}</span>
//                 <label htmlFor="password">Enter Your Password</label>
//                 <input type="password" placeholder="Password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <span className='error-message'>{errors.password}</span>
//                 <div className='adduser'>

//                  <button type='submit'>Login</button>

//                 </div>
//                 <div style={{ color: 'white' }}>
//                   doesn't remember ? :<Link to="/forgotpassword" style={{ color: 'white' }}>Forgot Password</Link>

//                 </div>

//             </form>
//         </div>
//     );
// };

// export default Login;
// import React, { useState } from 'react';
// import './Login.css'
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = {};
//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Invalid email address';
//         }
//         if (!password.trim()) {
//             newErrors.password = 'Password is required';
//         } else if (password.length < 6) {
//             newErrors.password = 'Password must be at least 6 characters';
//         }
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:3000/login', {
//                 email: email,
//                 password: password
//             });
//             console.log('email',email);
//             console.log('password',password);
//             console.log('Response data:', response.data); 
//             if (response.data.success) {
//               const decodedToken = decodeToken(response);

//                 const token = response.data.data;
//                 localStorage.setItem('token', token);
//                 const decodedToken = decodeToken(token);
//                 console.log("decodedtoken",decodedToken);

//                 if (decodedToken) {

//                     if (decodedToken.user_type === 'admin') {
//                         navigate('/admin');
//                     } else if (decodedToken.user_type === 'employee') {
//                         navigate('/employee');
//                     } else {
//                         console.error('Unknown or missing user role:', decodedToken);
//                     }
//                 } else {
//                     console.error('Failed to decode token:', token);
//                 }
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     text: response.data.message
//                 });
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             Swal.fire({
//                 icon: "error",
//                 text: "Failed to login. Please try again later."
//             });
//         }
//     };

//     // const decodeToken = (token) => {
//     //     try {
//     //         const base64Url = token.split('.')[1];
//     //         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     //         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//     //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     //         }).join(''));
//     //         return JSON.parse(jsonPayload);
//     //     } catch (error) {
//     //         console.error('Error decoding token:', error);
//     //         return null;
//     //     }
//     // };

//     const decodeToken = (token) => {
//       try {
//           // Check if token is a string
//           if (typeof token !== 'string') {
//               throw new Error('Token is not a string');
//           }

//           // Split token into parts
//           const parts = token.split('.');
//           if (parts.length !== 3) {
//               throw new Error('Invalid token format');
//           }

//           // Decode base64url and parse JSON payload
//           const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
//           const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//               return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//           }).join(''));

//           return JSON.parse(jsonPayload);
//       } catch (error) {
//           console.error('Error decoding token:', error);
//           return null;
//       }
//   };


//     return (
//         <div className='wrapper' >
//             <form className='wrap-item' onSubmit={handleSubmit}>
//                 <h2 className='title'>Login</h2>
//                 <label htmlFor="email">Enter your email</label>
//                 <input type="email" placeholder="Email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <span className='error-message'>{errors.email}</span>
//                 <label htmlFor="password">Enter Your Password</label>
//                 <input type="password" placeholder="Password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <span className='error-message'>{errors.password}</span>
//                 <div className='adduser'>
//                     <button type='submit'>Login</button>
//                 </div>
//                 <div>
//                     Doesn't remember <Link to="/forgotpassword">Forgot Password</Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { validateEmail, validatePassword } from './ValidationRules';

// function Login() {
//     console.log('login')
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       const newErrors = {}; 
//         newErrors.email = validateEmail(email);
//         newErrors.password = validatePassword(password);
//         console.log('validation ok')


//       if (Object.keys(newErrors).length > 0) {
//           setErrors(newErrors);
//           return;
//       }
//       console.log("reached here")

//       try {
//         console.log('trycatch ok')
//           const response = await axios.post('http://localhost:3000/login', {
//               email: email,
//               password: password
//           });

//           if (response.data.success) {
//             const { access_token, user } = response.data.data;
//             localStorage.setItem('token', access_token);

//             console.log('User:', user);
//             console.log('Access Token:', access_token);
//             Swal.fire({
//               icon: 'success',
//               title: 'Login Successful',
//               text: 'Redirecting...'
//           }).then (()=>{// Check if user object and user_type property are defined
//             if (user && user.user_type) {
//                 // Map ObjectId to string value
//                 const userTypeMap = {
//                     '65eecb8e18357aefe2c8f15b': 'admin',
//                     '65eecbcb18357aefe2c8f15c': 'employee'
//                     // Add more mappings as needed
//                 };

//                 // Get the corresponding user type string
//                 const userType = userTypeMap[user.user_type];

//                 // Redirect user based on user type or perform other actions
//                 if (userType === 'admin') {
//                     navigate('/admin');
//                 } else if (userType === 'employee') {
//                   navigate(`/employee/${user._id}`);
//                 } else {
//                     console.error('Unknown user role:', userType);
//                     // Handle the case when user_type is neither admin nor employee
//                 }
//             } else {
//                 console.error('User object or user_type property is missing:', user);
//                 // Handle the case when user object or user_type property is missing
//             }})


//         } else {
//             // Handle unsuccessful login
//             Swal.fire({
//                 icon: "error",
//                 text: response.data.message
//             });
//         }
//       } catch (error) {
//           console.log("response",error.response);
//         //   console.error('Login failed:', error.response.data);
//           Swal.fire({
//               icon: "error",
//               text: error.response.data.message
//           });
//       }
//   };

//     return (
//         <div className='wrapper' >
//             <form className='wrap-item' onSubmit={handleSubmit}>
//                 <h2 className='title'>Login</h2>
//                 <label htmlFor="email">Enter your email</label>
//                 <input type="email" placeholder="Email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <span className='error-message'>{errors.email}</span>
//                 <label htmlFor="password">Enter Your Password</label>
//                 <input type="password" placeholder="Password" name='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <span className='error-message'>{errors.password}</span>
//                 <div className='adduser'>
//                     <button type='submit'>Login</button>
//                 </div>
//                 <div>
//                     Don't remember <Link to="/forgotpassword">Forgot Password</Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Login;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password)
        };

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
                
            });
            console.log('34response',response.data.message)
           
            

            if (response.data.success) {
                console.log('successresponse',response)
                const { access_token, user } = response.data.data;
                localStorage.setItem('token', access_token);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Redirecting...'
                }).then(()=>{
                    
                const userTypeMap = {
                    '65eecb8e18357aefe2c8f15b': 'admin',
                    '65eecbcb18357aefe2c8f15c': 'employee'
                };

                const userType = userTypeMap[user.user_type];

                if (userType === 'admin') {
                    navigate(`/admin/${user._id}`);

                } else if (userType === 'employee') {
                    if (!response.data.data.lastLogin) {
                        navigate(`/employee/${user._id}/changepassword`);
                    } else {
                        navigate(`/employee/${user._id}`);
                        
                        
                    }
                }
                // else if (userType === 'employee'&& response.data.data.user.password_token===null) {
                //     navigate(`/employee/${user._id}`);
                //  }
                //  else if(userType==='employee'&&
                // response.data.data.requiresPasswordChange){
                //     navigate(`/employee/${user._id}/changepassword`)

                // }
                 else {
                    console.error('Unknown user role:', userType);
                }

                })


            } else {
               
                
                Swal.fire({
                   
                    icon: 'error',
                    text: response.data.message
                });
            }
        } catch (error) {
           console.log('catch error',error)
            
            Swal.fire({
                
                icon: 'error',
                text: error.response.data.message
            });
        }
    };

    return (
        <div className='wrapper'>
            <form className='wrap-item' onSubmit={handleSubmit}>
                <h2 className='title'>Login</h2>
                <label htmlFor='email'>Enter your email</label>
                <input type='email' placeholder='Email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className='error-message'>{errors.email}</span>
                <label htmlFor='password'>Enter Your Password</label>
                <input type='password' placeholder='Password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className='error-message'>{errors.password}</span>
                <div className='adduser'>
                    <button type='submit'>Login</button>
                </div>
                <div>
                    Don't remember <Link to='/forgotpassword'>Forgot Password</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;