import React from "react";
import TableComponent from "../table";
import { Link } from "react-router-dom";

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
      <p>Welcome to the List Products!</p>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;
