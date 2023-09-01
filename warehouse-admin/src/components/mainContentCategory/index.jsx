// MainContent.js
import React from "react";
import TableComponent from "../tableCategory";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <main
      style={{ display: "flex", margin: "10px 40px", flexDirection: "column" }}
    >
      <h2>Dashboard Produk Kategori INDOTEKNIK</h2>
      <p>
        <strong>Catatan!</strong> Masukkan semua produk kategori dengan BENAR
      </p>
      <div style={{ marginBottom: "30px" }}>
        <Link to="/add-category">
          <button
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Tambah Kategori
          </button>
        </Link>
        <Link to="/">
          <button style={{ marginBottom: "10px" }}>Dashboard Product</button>
        </Link>
      </div>
      <TableComponent />
    </main>
  );
};

export default MainContent;
