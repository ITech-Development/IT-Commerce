// Dashboard.js
import React from 'react';
import Header from '../../components/header';
import MainContent from '../../components/mainContent';

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
