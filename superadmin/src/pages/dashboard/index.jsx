// Dashboard.js
import React from 'react';
import Header from '../../components/navbar/products/header';
import MainContent from '../../components/navbar/products/mainContent';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
