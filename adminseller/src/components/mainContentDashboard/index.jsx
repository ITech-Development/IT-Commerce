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
  text-align: center;
  padding: 30px 0 20px 0;
  margin: auto;
`;

const MainContentDescription = styled.p`
  font-size: 16px;
  text-align: center;
  margin: auto;
`;

const MainContent = () => {
  return (
    <MainContentContainer>
      <MainContentTitle>Selamat Datang di Dashboard Indoteknik!</MainContentTitle>
      <MainContentDescription>
        Selamat Bekerja!
      </MainContentDescription>
      <CardComponent />
    </MainContentContainer>
  );
};

export default MainContent;
