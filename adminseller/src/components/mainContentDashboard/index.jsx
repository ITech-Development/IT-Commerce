import React from "react";
import styled from "styled-components";
import CardComponent from "../cardDasboard";

const MainContentContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MainContentTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  margin-left: 18px;
`;

const MainContentDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 18px;
`;

const MainContent = () => {
  return (
    <MainContentContainer>
      <MainContentTitle>Dashboard</MainContentTitle>
      <MainContentDescription>
        Welcome to the Indo Teknik Dashboard!
      </MainContentDescription>
      <CardComponent />
    </MainContentContainer>
  );
};

export default MainContent;
