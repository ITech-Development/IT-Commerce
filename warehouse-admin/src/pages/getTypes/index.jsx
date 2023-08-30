// Dashboard.js
import React from 'react';
import Header from '../../components/headerType';
import MainContent from '../../components/mainContentType';

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