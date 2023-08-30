import React from 'react';
import TableComponent from '../tableType';
import { Link } from 'react-router-dom'

const MainContent = () => {
  return (
    <main style={{ display: 'flex', margin: '10px 40px', flexDirection: 'column' }}>
      <h2>Dashboard Tipe Produk INDOTEKNIK</h2>
      <p><strong>Catatan!</strong> Masukkan semua tipe produk dengan BENAR</p>
      <Link to="/add-type">
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
          Tambah Tipe
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