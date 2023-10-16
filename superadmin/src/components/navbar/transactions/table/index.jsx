import React, { Component, useEffect, useState } from 'react';

function CheckoutProducts() {
  const [checkoutData, setCheckoutData] = useState({});

  useEffect(() => {
    // Fetch the data from your backend API here
    // Replace the URL with your API endpoint
    fetch('http://localhost:3100/super-admins/transactions', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => response.json())
      .then((data) => setCheckoutData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <h1>Checkout Products</h1>
      {Object.keys(checkoutData).map((checkoutId) => (
        <div key={checkoutId}>
          <hr />
          <h2>Checkout ID: {checkoutId}</h2>
          {checkoutData[checkoutId].map((productInfo, index) => (
            <div key={index}>
              <img src={productInfo.product.image} alt="" width='100' />
              <h3>Produk: {productInfo.product.name}</h3>
              <p>Deskripsi: {productInfo.product.name}</p>
              <p>Unit Price: {productInfo.product.unitPrice}</p>
              <p>Stok: {productInfo.product.stock}</p>
              {/* Render other product and checkout details */}
            </div>
          ))}
          <h2>Qty: </h2>
          <div>
            {checkoutData[checkoutId].length}
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
}

export default CheckoutProducts;
