import React from 'react';
import TableComponent from '../tableProduct';
import { Link } from 'react-router-dom'

const MainContent = () => {
  return (
    <main style={{ display: 'flex', margin: '10px 40px', flexDirection: 'column' }}>
      <h2>Dashboard Produk INDOTEKNIK</h2>
      <p><strong>Catatan!</strong> Masukkan semua produk dengan BENAR</p>
      <div style={{ marginBottom: '30px' }}>

      <Link to="/add-product">
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
          Add Product
        </button>
      </Link>
      <Link to="/dashboard-categories">
      <button style={{ marginBottom: '10px' }}>Dashboard Kategori</button>
      </Link>
      <Link to="/dashboard-types">
        <button>Dashboard Tipe</button>
      </Link>
      </div>
      <TableComponent />
    </main>
  );
};

export default MainContent;