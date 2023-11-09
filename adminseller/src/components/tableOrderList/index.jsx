// src/components/CheckoutList.js
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const CheckoutList = ({ data }) => {
  const [showExpedited, setShowExpedited] = useState(true);

  const expeditedShipments = data.filter(
    (checkout) => checkout.checkout.isPickUpInStore === false
  );

  const pickUpInStoreShipments = data.filter(
    (checkout) => checkout.checkout.isPickUpInStore === true
  );
  return (
    <div>
      <div>
        <button onClick={() => setShowExpedited(true)}>Expedited Shipments</button>
        <button onClick={() => setShowExpedited(false)}>Pick Up in Store Shipments</button>
      </div>

      {showExpedited ? (
        <div>
          <h2>Expedited Shipments:</h2>
          {expeditedShipments.map((checkout) => (
            <div key={checkout.checkout.id}>
              {/* <h2>Checkout ID: {checkout.checkout.id}</h2> */}
              <h2>Midtrans Code: {checkout.checkout.midtransCode}</h2>
              <h2>User: {checkout.checkout?.users?.fullName}</h2>
              <p>Total Price: {checkout.checkout.totalPrice}</p>
              <p>Payment Status: {checkout.checkout.paymentStatus}</p>
              <p>Shipping Method: {checkout.checkout.shippingMethod}</p>
              <p>Shipping Address: {checkout.checkout.shippingAddress}</p>
              <p>Delivery Status: <Link to={`${checkout.checkout.id}`}>{checkout.checkout.deliveryStatus} </Link></p>
              <p>Order Date: {new Date(checkout.checkout.createdAt).toLocaleString()}</p>
              <h3>Products:</h3>
              <ul>
                {checkout.products.map((product) => (
                  <li key={product.id}>
                    <img src={product.image} alt={product.name} width='100px' />
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
      ) : (
        <div>
          <h2>Pick Up in Store Shipments:</h2>
          {pickUpInStoreShipments.map((checkout) => (
            <div key={checkout.checkout.id}>
              {/* <h2>Checkout ID: {checkout.checkout.id}</h2> */}
              <h2>Midtrans Code: {checkout.checkout.midtransCode}</h2>
              <h2>User: {checkout.checkout?.users?.fullName}</h2>
              <p>Total Price: {checkout.checkout.totalPrice}</p>
              <p>Payment Status: {checkout.checkout.paymentStatus}</p>
              <p>Pick Up in Store: Yes</p>
              <p>Shipping Address: {checkout.checkout.shippingAddress}</p>
              <p>Delivery Status: <Link to={`${checkout.checkout.id}`}>{checkout.checkout.deliveryStatus} </Link></p>
              <p>Order Date: {new Date(checkout.checkout.createdAt).toLocaleString()}</p>
              <h3>Products:</h3>
              <ul>
                {checkout.products.map((product) => (
                  <li key={product.id}>
                    <img src={product.image} alt={product.name} width='100px' />
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
      )}
    </div>
  );
};

export default CheckoutList;
