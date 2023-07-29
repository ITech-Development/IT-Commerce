// Dashboard.js
import React from 'react';
import HeaderDashboard from '../../components/headerDashboard';
import MainContentDashboard from '../../components/mainContentDashboard';

const Dashboard = () => {
  return (
    <div>
      <HeaderDashboard />
      <div style={{ display: 'flex' }}>
        <MainContentDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
