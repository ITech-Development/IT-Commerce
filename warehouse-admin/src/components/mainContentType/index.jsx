import React from 'react';
import TableComponent from '../tableType';
import { Link } from 'react-router-dom'

const MainContent = () => {
  return (
    <main style={{ display: 'flex', margin: '80px 40px 30px 40px', flexDirection: 'column' }}>
      <h2>Dashboard Tipe Produk INDOTEKNIK</h2>
      <p><strong>Catatan!</strong> Masukkan semua tipe produk dengan BENAR</p>
      <div style={{ marginBottom: '30px' }}>

      <Link to="/add-type">
        <button
           style={{
            padding: '10px 20px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Tambah Tipe
        </button>
      </Link>
      <Link to="/">
      <button style={{ marginBottom: '10px' }}>Dashboard Product</button>
      </Link>
      </div>
      <TableComponent />
    </main>
  );
};

export default MainContent;