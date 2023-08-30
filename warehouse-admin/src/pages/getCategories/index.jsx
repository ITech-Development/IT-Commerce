import React from 'react';
import Header from '../../components/headerCategory';
import MainContent from '../../components/mainContentCategory';

const Category = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <MainContent />
      </div>
    </div>
  );
};

export default Category;