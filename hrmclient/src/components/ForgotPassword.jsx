
import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage(response.data.message); 
      if (response.data.message === "Email sent successfully") {
        // Show an alert if the email is sent successfully
        alert("Email sent successfully. Please check your email.");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        setMessage(error.response.data.message);
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    
    <div className="main message-container">
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Submit</button>
      {message && <p className="message-container">{message}</p>}
    </div>
  </div>
  );
}

export default ForgotPassword;
