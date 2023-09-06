import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});

  useEffect(() => {
    // Replace with actual API endpoint
    fetch('https://indoteknikserver-732012365989.herokuapp.com/checkout-products',
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
                <Link to={`/my-order/${productInfo.checkout.id}`}>
                  <img src={productInfo.product.image} alt={productInfo.product.name} width="100px" /> <br />
                  Product: {productInfo.product.name} <br />
                </Link>
                x: {productInfo.quantity} <br />
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
