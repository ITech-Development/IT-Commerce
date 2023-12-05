import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetMeQuery, useEditMeMutation } from "../../features/user/apiUser";
import Banner from "../../assets/bannerProfile.jpg";
import Coin from "../../assets/coin.png";
import Email from "../../assets/mail.png";
import Phone from "../../assets/phone-call.png";
import Place from "../../assets/placeholder.png";
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
  const [activeTab, setActiveTab] = useState("pesananSaya"); // set the default tab to "pesananSaya"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (isError) {
    return <ErrorContainer>Error loading profile data.</ErrorContainer>;
  }

  return (
    <Container>
      <BannerImage src={Banner} alt="Banner" />
      <ProfileCard>
        <ProfileImage src={userData?.imageProfile} alt="Profile" />
        <ProfileData>
          <UserName>{fullName}</UserName>
          <CoinContainer>
            <CoinImage src={Coin} alt="Coin" />
            {userData?.purchasePoints}
          </CoinContainer>
          <ProfileIcons>
            <ProfileIcon>
              <IconImage src={Email} alt="Email" />
              <IconText>{userData.email}</IconText>
            </ProfileIcon>
            <ProfileIcon>
              <IconImage src={Phone} alt="Phone" />
              <IconText>{phoneNumber}</IconText>
            </ProfileIcon>
            <ProfileIcon>
              <IconImage src={Place} alt="Address" />
              <IconText>{address}</IconText>
            </ProfileIcon>
          </ProfileIcons>
        </ProfileData>
        <hr />
        <TabButton onClick={() => handleTabClick("updateProfile")}>
          Update Profile
        </TabButton>
        <TabButton onClick={() => handleTabClick("pesananSaya")}>
          Pesanan Saya
        </TabButton>
      </ProfileCard>

      {activeTab === "updateProfile" && (
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

const Container = styled.div`
  // Add global styles here if needed
`;

const LoadingContainer = styled.div`
  text-align: center;
  // Add loading styles here if needed
`;

const ErrorContainer = styled.div`
  text-align: center;
  // Add error styles here if needed
`;

const BannerImage = styled.img`
  width: auto;
  height: 280px;

  @media (max-width: 768px) {
    height: 180px;
    width: 100%;
    opacity: 1;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  width: 20%;
  margin: 0 40px;
  position: relative;
  top: -120px;
  padding: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 0 2px white, 0.5em 0.3em 1em 0.4em rgba(123, 231, 235, 0.6);

  @media (max-width: 768px) {
    background-color: transparent;
    width: auto;
    margin: 30px 0px 0 0px;
    border-radius: none;
    box-shadow: none;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 10px 0;
`;

const ProfileData = styled.div`
  padding: 20px 30px;

  @media (max-width: 768px) {
    padding: 25px 0 0 0;
  }
`;

const UserName = styled.h3`
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CoinContainer = styled.p`
  display: flex;
  align-items: center;
  margin-top: 5px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
`;

const CoinImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

const ProfileIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileIcon = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    border-radius: 10px;
    box-shadow: 0 0 0 2px white, 0.5em 0.3em 1em 0.4em rgba(123, 231, 235, 0.6);
    padding: 5px 10px;
  }

  margin-bottom: 10px;
`;

const IconImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const IconText = styled.p`
  margin: 0;
`;

const TabButton = styled.button`
  // Add styling for tab buttons here
`;

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
