// Dashboard.js
import React from 'react';
import Header from '../../components/headerDashboard';
import MainContent from '../../components/mainContentDashboard';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', margin: 'auto', maxWidth: '1420px' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
