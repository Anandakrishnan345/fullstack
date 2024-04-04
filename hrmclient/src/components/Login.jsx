



import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { validateEmail, validatePassword } from './ValidationRules';
import BASE_URL from './Base_url';



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
            const response = await axios.post(`${BASE_URL}:3000/login`, {
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