// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useGetMeQuery } from "../../features/user/apiUser";
import styled from "styled-components";
import Coin from "../../assets/coin.png";
import Email from "../../assets/mail.png";
import Phone from "../../assets/phone-call.png";
import Place from "../../assets/placeholder.png";

const Sidebar = ({ allowedRoutes }) => {
  const location = useLocation();
  const { data: userData, isError, isLoading } = useGetMeQuery();
  console.log(userData, "sidebar");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
      setPhoneNumber(userData.phoneNumber);
      setAddress(userData.address);
    }
  }, [userData]);

  // Check if the current route is in the allowedRoutes list
  const shouldRenderSidebar = allowedRoutes.includes(location.pathname);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  return (
    shouldRenderSidebar && (
      <div className="sidebar">
        <div>
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
        </div>
        <hr />
        <div className="sidebar-item">
          <Link to="/user/my-account">Akun Saya</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/user/my-order">Pesanan Saya</Link>
        </div>
      </div>
    )
  );
};

export default Sidebar;

const ProfileCard = styled.div`
  background-color: white;
  width: 86%;
  margin: auto;
  position: fix;
  padding: 0;
  top: -120px;
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
