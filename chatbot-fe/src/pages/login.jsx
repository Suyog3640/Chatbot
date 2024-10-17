import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
        const res = await axios.post(`${apiUrl}/user/login`, { email, password });
        // Assuming a successful login returns a 201 status code
        if (res.status === 200) {
            sessionStorage.setItem('userId', res.data._id);
            sessionStorage.setItem('chatbotId', res.data.chatbotId);  
            const chatbotId = sessionStorage.getItem('chatbotId');
            // console.log(chatbotId)
            navigate('/user'); 
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

  return (
    <div className='login-container'>
      <form className='styled-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
            <dl>
                <dd><input type='text' name='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)} /></dd>
                <dd><input type='password' name='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)} /></dd>
      
                <button type='submit' className='submit-button'>Login</button>
            </dl>
        </div>
      </form>
    </div>
  )
}
