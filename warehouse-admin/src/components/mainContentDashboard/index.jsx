// MainContent.js
import React from 'react';
// import TableComponent from '../table';
import CardComponent from '../cardDasboard'
import { Link } from 'react-router-dom'

const MainContent = () => {

  return (
     <main style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
      <h2>List Products</h2>
      <Link to="/add-product">
        <button
          style={{
            display: "flex",
            padding: "10px 20px",
            background: "blue",
            color: "white",
            justifyContent: "end",
            marginBottom: "30px",
            border: 'none',
            borderRadius: '5px',
            width: 'auto',
            cursor: 'pointer'
          }}
        >
          Add Product
        </button>
      </Link>
      <CardComponent />
    </main>
  );
};

export default MainContent;
