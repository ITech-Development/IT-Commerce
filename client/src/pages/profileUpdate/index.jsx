import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    imageProfile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, 'filllellelelelle');
    setFormData((prevState) => ({
      ...prevState,
      imageProfile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('imageProfile', formData.imageProfile);

      // const userId = 1; // Replace with the authenticated user's ID
      const response = await fetch(`http://localhost:3100/users/${id}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      });

      if (response.ok) {
        // Pembaruan berhasil, lakukan sesuatu, misalnya tampilkan notifikasi
        console.log('User data updated successfully!');
      } else {
        // Tangani kasus jika ada masalah pada pembaruan data
        console.error('Failed to update user data.');
      }
    } catch (error) {
      console.error('An error occurred while updating user data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div>
        <label>Image Profile:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
