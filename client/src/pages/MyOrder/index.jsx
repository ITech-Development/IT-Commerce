import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutProductsPage.css';

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});

  useEffect(() => {
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
      {Object.keys(checkoutProducts).length === 0 ? (
        <p>Anda belum pernah belanja di sini</p>
      ) : (
        Object.keys(checkoutProducts).map(checkoutId => (
          <div key={checkoutId} className="checkout-table">
            <h2>{checkoutProducts[checkoutId][0]?.product?.product_owners?.name}</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kuantitas</th>
                    <th>Kode Voucher</th>
                    <th>Status Pembayaran</th>
                    <th>Total Bayar</th>
                    <th>Alamat Pengiriman</th>
                    <th>Status Pengiriman</th>
                    <th>Tanggal Belanja</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutProducts[checkoutId].map((productInfo, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/my-order/${productInfo.checkout.id}`}>
                          <div className="product-info">
                            <img src={productInfo.product.image} alt={productInfo.product.name} />
                            <span>{productInfo.product.name}</span>
                          </div>
                        </Link>
                      </td>
                      <td>{productInfo.quantity}</td>
                      <td>{productInfo.checkout.voucherCode}</td>
                      <td>{productInfo.checkout.paymentStatus}</td>
                      <td>{productInfo.checkout.totalPrice}</td>
                      <td>{productInfo.checkout.shippingAddress}</td>
                      <td>Sedang dikemas</td>
                      <td>{productInfo.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="buy-again-button">Beli lagi</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CheckoutProductsPage;