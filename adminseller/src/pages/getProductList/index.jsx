// Dashboard.js
import React from 'react';
import Header from '../../components/header/headerTransactionList';
import MainContent from '../../components/mainContent/mainContentProductList';

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