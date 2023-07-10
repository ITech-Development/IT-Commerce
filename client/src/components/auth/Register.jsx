import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [imageProfile, setImageProfile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!fullName || !email || !password || !phoneNumber || !address || !imageProfile) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare user data object
    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      address,
      imageProfile,
    };

    try {
      // Call the API to register the user
      const response = await axios.post('http://localhost:3100/users/register', userData);
      console.log('Registration response:', response.data);

      // Clear form fields
      setFullName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
      setImageProfile('');

      // Display success message or redirect to another page
      alert('Registration successful!');

      // Redirect to the Home page
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageProfile">Image Profile:</label>
          <input
            type="text"
            id="imageProfile"
            value={imageProfile}
            onChange={(e) => setImageProfile(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
