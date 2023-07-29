// ProfileForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  max-width: 400px;
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

const ProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement the logic to handle form submission.
    // You can access the form data (fullName, email, phone, address, profilePicture)
    // and perform the necessary actions (e.g., sending data to the server, etc.).

    // For this example, we'll just display the data in the console.
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Address:', address);
    console.log('Profile Picture URL:', profilePicture);
  };
  
const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  return (
    <FormContainer>
      <Heading>Update Your Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Label>Full Name</Label>
        <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <Label>Phone</Label>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <Label>Address</Label>
        <TextArea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} />
    
        <Label>Profile Picture</Label>
        <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />

        {profilePicture && (
          <ProfilePicture src={URL.createObjectURL(profilePicture)} alt="Profile" />
        )}


        <Button type="submit">Update Profile</Button>
      </form>
    </FormContainer>
  );
};

export default ProfileForm;
