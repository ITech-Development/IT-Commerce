// ProductsPage.js
import React from 'react';
import Header from '../../components/navbar/users/header/index';
import MainContent from '../../components/navbar/users/mainContent/index';

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
