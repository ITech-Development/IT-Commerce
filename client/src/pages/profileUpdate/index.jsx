import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetMeQuery, useEditMeMutation } from "../../features/user/apiUser";
import Banner from "../../assets/bannerProfile.jpg";
import Coin from "../../assets/coin.png";
import Email from "../../assets/mail.png";
import Phone from "../../assets/phone-call.png";
import Place from "../../assets/placeholder.png";

const ProfileForm = () => {
  const { data: userData, isError, isLoading } = useGetMeQuery();
  const [editMe, { isLoading: isEditing }] = useEditMeMutation();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    // const updatedUserData = {
    //   fullName,
    //   phoneNumber,
    //   address,
    //   imageProfile: profileImage,
    // };

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
      <BannerImage src={Banner} alt="Banner" />
      <ProfileHeader>
        <ProfileTitle>Update Profile</ProfileTitle>
      </ProfileHeader>

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
      </ProfileCard>

      <Form onSubmit={handleSubmit}>
        <TitleForm>Update Profile</TitleForm>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            width="100"
            style={{ borderRadius: "10px" }}
          />
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          placeholder="Ganti Foto Profil"
        />

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
      </Form>
    </Container>
  );
};

export default ProfileForm;

const Container = styled.div`
  // text-align: center;
`;

const BannerImage = styled.img`
  width: auto;
  height: 280px;
  @media (max-width: 768px) {
    height: 180px;
    width: 100%;
    opacity: 1; /* Added opacity */
  }
`;

const ProfileHeader = styled.div`
  background-color: rgba(0, 255, 255, 0.212);
  padding: 3px 0;
  margin-top: -4px;
`;

const ProfileTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 29%;

  @media (max-width: 768px) {
    display: none;
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

const TitleForm = styled.h3`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    font-size: 20px;
    padding-bottom: 5px;
  }
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

const Form = styled.form`
  padding-left: 29%;
  width: auto;
  padding-right: 60px;
  margin-bottom: 30px;
  margin-top: -350px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: -100px 15px 40px 15px;
    padding: 0;
    width: auto;
    height: auto;
  }
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
  @media (max-width: 768px) {
    width: auto;
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
  @media (max-width: 768px) {
    width: auto;
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
