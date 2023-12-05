import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useGetMeQuery,
  useEditMeMutation,
} from "../../../features/user/apiUser";
import MyOrder from "../MyOrder";
import UpdateProfile from "./Update";

const ProfileForm = () => {
  const { data: userData, isError, isLoading } = useGetMeQuery();
  const [editMe, { isLoading: isEditing }] = useEditMeMutation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab] = useState("updateProfile");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  };

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
      setPhoneNumber(userData.phoneNumber);
      setAddress(userData.address);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = new FormData();

    updatedUserData.append("fullName", fullName);
    updatedUserData.append("phoneNumber", phoneNumber);
    updatedUserData.append("address", address);
    updatedUserData.append("imageProfile", profileImage);

    try {
      const response = await editMe(updatedUserData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).unwrap();
      console.log("Profile updated successfully", response);
    } catch (error) {
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
    <Container>
      {activeTab === "updateProfile" && (
        <div>
          <UpdateProfile
            handleSubmit={handleSubmit}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            fullName={fullName}
            setFullName={setFullName}
            userData={userData}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            address={address}
            setAddress={setAddress}
            isEditing={isEditing}
          />
        </div>
      )}
      {activeTab === "pesananSaya" && (
        <MyOrderContainer>
          <MyOrder />
        </MyOrderContainer>
      )}
    </Container>
  );
};

export default ProfileForm;

const MyOrderContainer = styled.div`
  padding-left: 29%;
  width: auto;
  padding-right: 60px;
  margin-bottom: 30px;
  margin-top: -450px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: -100px 15px 40px 15px;
    padding: 0;
    width: auto;
    height: auto;
  }
`;

const Container = styled.div`
  // text-align: center;
`;
