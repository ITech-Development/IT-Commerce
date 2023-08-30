import React from 'react';
import TableComponent from '../tableProduct';
import { Link } from 'react-router-dom'

const MainContent = () => {
  return (
    <main style={{ display: 'flex', margin: '10px 40px', flexDirection: 'column' }}>
      <h2>Dashboard Produk INDOTEKNIK</h2>
      <p><strong>Catatan!</strong> Masukkan semua produk dengan BENAR</p>
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
      <Link to="/dashboard-categories">
        <button>Dashboard Kategori</button>
      </Link>
      <Link to="/dashboard-types">
        <button>Dashboard Tipe</button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;