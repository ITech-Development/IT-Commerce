import React, { Component, useEffect, useState } from 'react';

function CheckoutProducts() {
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    // Fetch the data from your backend API here
    // Replace the URL with your API endpoint
    fetch('http://localhost:3100/super-admins/transactions', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      {Object.keys(transactions).map((transactionId) => (
        <div key={transactionId}>
          <hr />
          <h2>Transaction ID: {transactionId}</h2>
          {transactions[transactionId].map((productInfo, index) => (
            <div key={index}>
              <img src={productInfo.product.image} alt="" width='100' />
              <h3>Produk: {productInfo.product.name}</h3>
              <p>Deskripsi: {productInfo.product.name}</p>
              <p>Unit Price: {productInfo.product.unitPrice}</p>
              <p>Stok: {productInfo.product.stock}</p>
              {/* Render other product and checkout details */}
            </div>
          ))}
          <h4>Qty: {transactions[transactionId].length}</h4>
        </div>
      ))}
      <hr />
    </div>
  );
}

export default CheckoutProducts;
