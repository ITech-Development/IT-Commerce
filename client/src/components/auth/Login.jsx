import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

import { UserContext } from '../../App.jsx'

const Login = () => {

  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }
    
    const userData = {
      email,
      password,
    };

    try {
      // Call the API to perform login
      const response = await axios.post('http://localhost:3100/users/login', userData);
      console.log('Login response:', response.data);

      // Save the access token to local storage
      localStorage.setItem('access_token', response.data.access_token);

      // Clear form fields
      setEmail('');
      setPassword('');

      // Redirect to the Home page
      dispatch({type: 'USER', payload:true})
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
