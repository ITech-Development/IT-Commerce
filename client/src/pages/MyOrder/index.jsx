import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckoutProducts() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  console.log(checkoutProducts, 'test tist ouy');

  useEffect(() => {
    // Panggil endpoint getAllCheckoutProducts
    axios.get('http://localhost:3100/checkout-products', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        setCheckoutProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Checkout Products</h1>
      {Object.keys(checkoutProducts).map(checkoutId => (
        <div key={checkoutId}>
          <h2>Checkout ID: {checkoutId}</h2>
          <ul>
            {checkoutProducts[checkoutId].map(product => (
              <li key={product.id}>
                Product Name: {product.name}<br />
                Quantity: 
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CheckoutProducts;
