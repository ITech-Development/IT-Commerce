import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const API_URL = "http://localhost:3100";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  console.log(checkoutProducts, 'hei test products');

  useEffect(() => {
    // Replace with actual API endpoint
    fetch('http://localhost:3100/checkout-products',
      {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => response.json())
      .then(data => setCheckoutProducts(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Checkout Products</h1>
      {Object.keys(checkoutProducts).map(checkoutId => (
        <div key={checkoutId}>
          <h2>{checkoutProducts[checkoutId][0]?.product?.product_owners?.name}</h2>
          <ul>
            {checkoutProducts[checkoutId].map((productInfo, index) => (
              <li key={index}>
                <Link to={`/products/${productInfo.product.id}`}>
                <img src={`${API_URL}/${productInfo.product.image}`} alt={productInfo.product.name} width="100px" /> <br />
                </Link>
                Product: {productInfo.product.name} <br />
                Quantity: {productInfo.quantity} <br />
                Payment Status: {productInfo.checkout.paymentStatus} <br />
                Checkout Date: {productInfo.createdAt}
              </li>
            ))}
            
          </ul>
          <button>Beli lagi</button>
        </div>
      ))}
    </div>
  );
}

export default CheckoutProductsPage;
