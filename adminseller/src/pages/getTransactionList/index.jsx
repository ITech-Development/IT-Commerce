// Dashboard.js
import React from 'react';
import Header from '../../components/headerTransactionList';
import MainContent from '../../components/mainContent/mainContentTransactionList';

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