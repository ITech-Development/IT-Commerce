// src/components/CheckoutList.js

import React from 'react';

const CheckoutList = ({ data }) => {
  return (
    <div>
      <hr />
      {data.map((checkout) => (
        <div key={checkout.checkout.id}>
          <h2>Checkout ID: {checkout.checkout.id}</h2>
          <h2>User: {checkout.checkout?.users?.fullName}</h2>
          <p>Total Price: {checkout.checkout.totalPrice}</p>
          <p>Shipping Address: {checkout.checkout.shippingAddress}</p>
          <p>Order Date: {checkout.checkout.createdAt}</p>
          <h3>Products:</h3>
          <ul>
            {checkout.products.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} width='100px'/>
                <h4>{product.name}</h4>
                <p>Description: {product.description}</p>
                <p>Unit Price: {product.unitPrice}</p>
                <p>Stock: {product.stock}</p>
                {/* Tampilkan info lainnya sesuai kebutuhan */}
              </li>
            ))}
          </ul>
          <h3>Qty: </h3>
          <ul>
            {checkout.products.length}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CheckoutList;
