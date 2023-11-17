// Dashboard.js
import React from 'react';
import Header from '../../components/header/headerOrderList';
import MainContent from '../../components/mainContent/mainContentOrderList';

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