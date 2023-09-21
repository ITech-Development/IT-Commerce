// Dashboard.js
import React from 'react';
import Header from '../../components/headerOrderList';
import MainContent from '../../components/mainContentOrderList';

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