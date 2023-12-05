import React from "react";
import styled from "styled-components";

function UpdateProfile({
  handleSubmit,
  previewImage,
  handleImageChange,
  fullName,
  setFullName,
  userData,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  isEditing,
}) {
  return (
    <div>
      <ProfileHeader>
        <ProfileTitle>Profil Saya</ProfileTitle>
        <ProfileDescription>
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun
        </ProfileDescription>
      </ProfileHeader>
      <Form onSubmit={handleSubmit}>
        <TitleForm>Update Profile</TitleForm>
        <Label>Profile Image</Label>
        {previewImage && <img src={previewImage} alt="Preview" width="200" />}
        <Input type="file" accept="image/*" onChange={handleImageChange} />
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
    </div>
  );
}

export default UpdateProfile;

const ProfileHeader = styled.div`
  background-color: rgba(0, 255, 255, 0.212);
  padding: 3px 0;
  margin-top: -450px;
`;

const ProfileTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-left: 29%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileDescription = styled.p`
  font-size: 14px;
  padding-left: 29%;

  @media (max-width: 768px) {
    display: none;
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

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const TitleForm = styled.h3`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    font-size: 20px;
    padding-bottom: 5px;
  }
`;

const Form = styled.form`
  padding-left: 29%;
  width: auto;
  padding-right: 60px;
  margin-bottom: 30px;
  margin-top: 10px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: -100px 15px 40px 15px;
    padding: 0;
    width: auto;
    height: auto;
  }
`;
