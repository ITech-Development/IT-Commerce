// Dashboard.js
import React from 'react';
import Header from '../../components/header';
import MainContent from '../../components/mainContent';

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