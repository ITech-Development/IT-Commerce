// Dashboard.js
import React from 'react';
import Header from '../../components/headerProduct';
import MainContent from '../../components/mainContentProduct';

const Product = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Product;