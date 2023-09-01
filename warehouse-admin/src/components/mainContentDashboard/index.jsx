// MainContent.js
import React from 'react';
// import TableComponent from '../table';
import CardComponent from '../cardDasboard'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const MainContent = () => {

  const ButtonLink = styled(Link)`
  display: flex;
  padding: 10px 20px;
  background: blue;
  color: white;
  justify-content: flex-end;
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  width: auto;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #0044aa;
  }
`;

  return (
     <main style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
      <h2>List Products</h2>
      <ButtonLink to="/add-product" target="_blank">
          Add Product
      </ButtonLink>
      <CardComponent />
    </main>
  );
};

export default MainContent;
