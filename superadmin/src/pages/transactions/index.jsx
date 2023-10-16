// Dashboard.js
import React from 'react';
import Header from '../../components/navbar/transactions/header';
import MainContent from '../../components/navbar/transactions/mainContent';

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