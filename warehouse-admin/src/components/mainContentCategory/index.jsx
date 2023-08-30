// MainContent.js
import React from 'react';
import TableComponent from '../tableCategory';
import { Link } from 'react-router-dom'

const MainContent = () => {

  return (
    <main style={{ display: 'flex', margin: '10px 40px', flexDirection: 'column' }}>
      <h2>Dashboard Produk Kategori INDOTEKNIK</h2>
      <p><strong>Catatan!</strong> Masukkan semua produk ketegori dengan BENAR</p>
      <Link to="/add-category">
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
          Add Category
        </button>
      </Link>
      <Link to="/dashboardProducts">
        <button>Dashboard Produk</button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;
