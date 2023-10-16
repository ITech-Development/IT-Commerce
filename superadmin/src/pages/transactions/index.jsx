// Dashboard.js
import React from 'react';
import Header from '../../components/navbar/transactions/headerOrderList';
import MainContent from '../../components/navbar/transactions/mainContentOrderList';

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