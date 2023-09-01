// Dashboard.js
import React from 'react';
import Header from '../../components/headerUser';
import MainContent from '../../components/mainContentUser';

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