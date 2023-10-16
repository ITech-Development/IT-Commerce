// ProductsPage.js
import React from 'react';
import Header from '../../components/navbar/products/header';
import MainContent from '../../components/navbar/products/mainContent/index';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default ProductsPage;
