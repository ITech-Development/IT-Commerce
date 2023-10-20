import React from 'react';
import Header from '../../components/headerCategory';
import MainContent from '../../components/mainContentCategory';

const Category = () => {
  return (
    <div style={{display: 'flex', margin: 'auto',}}>
      <Header />
      <div style={{ display: 'flex', marginTop: '80px' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Category;