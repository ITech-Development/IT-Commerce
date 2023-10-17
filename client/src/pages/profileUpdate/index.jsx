import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetMeQuery, useEditMeMutation } from "../../features/user/apiUser"; // Import the hooks
// import { useDispatch } from "react-redux";

const ProfileForm = () => {
  // Use the useGetMeQuery hook to fetch the user's profile data
  const { data: userData, isError, isLoading } = useGetMeQuery();

  // Use the useEditMeMutation hook to update the user's profile data
  const [editMe, { isLoading: isEditing }] = useEditMeMutation();

  // const dispatch = useDispatch();

  // Create state variables to track form input values
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Populate the form fields with user data when userData is available
    if (userData) {
      setFullName(userData.fullName);
      setPhoneNumber(userData.phoneNumber);
      setAddress(userData.address);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with updated user data
    const updatedUserData = {
      fullName,
      phoneNumber,
      address,
    };

    try {
      // Call the editMe mutation to update the user's profile
      const response = await editMe(updatedUserData).unwrap();

      // Optionally, you can dispatch an action to update the user's data in Redux store
      // dispatch(updateUserData(response));

      // Handle success, e.g., show a success message
      console.log("Profile updated successfully", response);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error updating profile", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <FormContainer>
      <Heading>
        <img
          style={{ width: "100px" }}
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </Heading>
      <form onSubmit={handleSubmit}>
        <Label>Nama Lengkap</Label>
        <Input
          name="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Label>Email</Label>
        <Input name="email" type="email" value={userData?.email} readOnly />

        <Label>No.Hp</Label>
        <Input
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Label>Alamat</Label>
        <TextArea
          name="address"
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button type="submit" disabled={isEditing}>
          {isEditing ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ProfileForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  margin: auto;
  padding: 70px 0 0 0;
  @media (max-width: 768px) {
    display: flex;
    position: relative;
    margin: 0 ,
    padding-bottom: 30px;
    width: 95%;
    height: auto;
    
  }
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
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;
