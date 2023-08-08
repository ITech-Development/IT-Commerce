// ProfileForm.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

const ProfileForm = () => {

  const [user, setUser] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    // Tambahkan atribut lainnya jika perlu
  });
  // console.log(typeof user.id, 'testtesttest');
  // const id = user.id

  useEffect(() => {
    fetchProfileData();
    // fetchProductOwners();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/users/me`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data produk:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3100/users/me`, user, {
        headers: {
          // 'Content-Type': 'application/json',
          access_token: localStorage.getItem('access_token'),
          // Tambahkan header lainnya sesuai kebutuhan
        },
      });

      if (response.status === 200) {
        // Jika berhasil, Anda dapat melakukan redirect ke halaman lain atau memberikan notifikasi berhasil edit produk.
        // Contoh:
        console.log('Produk berhasil diupdate.');
        window.location.href = '/profile-update';
      } else {
        console.error('Terjadi kesalahan saat mengupdate produk.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }

  };

  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePicture(file);
  // };

  return (
    <FormContainer>
      <Heading>Update Your Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Label>Full Name</Label>
        <Input
          name="fullName"
          type="text"
          value={user.fullName}
          onChange={handleChange}
        />

        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          readOnly
        // onChange={(e) => setEmail(e.target.value)}
        />

        <Label>Phone</Label>
        <Input
          name="phoneNumber"
          type="tel"
          value={user.phoneNumber}
          onChange={handleChange}
        // onChange={(e) => setPhone(e.target.value)}
        />

        <Label>Address</Label>
        <TextArea
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          // onChange={(e) => setAddress(e.target.value)}
          rows={4}
        />



        <Button type="submit">Update Profile</Button>
      </form>
    </FormContainer>
  );
};

export default ProfileForm;


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 90px auto;
  padding: 20px 70px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  color: #007bff;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: vertical;

export default Profile;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  border: 2px solid #007bff;
`;
