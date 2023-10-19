import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutProductsPage.css';

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  const [activeTab, setActiveTab] = useState('Semua');

  useEffect(() => {
    fetch('https://indoteknikserver-732012365989.herokuapp.com/checkout-products', {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    })
      .then((response) => response.json())
      .then((data) => setCheckoutProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredCheckoutProducts = Object.keys(checkoutProducts).reduce(
    (result, checkoutId) => {
      const checkout = checkoutProducts[checkoutId][0]?.checkout;
      if (activeTab === 'Semua' || checkout?.deliveryStatus === activeTab) {
        result[checkoutId] = checkoutProducts[checkoutId];
      }
      return result;
    },
    {}
  );

  return (
    <div className="checkout-container">
      {/* <h2 className='pesanUser'>History Transaksi</h2> */}

      <div className="tabs">
        <button
          onClick={() => setActiveTab('Semua')}
          className={activeTab === 'Semua' ? 'active' : ''}
        >
          Semua
        </button>
        <button
          onClick={() => setActiveTab('Sedang dikemas')}
          className={activeTab === 'Sedang dikemas' ? 'active' : ''}
        >
          Sedang dikemas
        </button>
        <button
          onClick={() => setActiveTab('Dikirim')}
          className={activeTab === 'Dikirim' ? 'active' : ''}
        >
          Dikirim
        </button>
        <button
          onClick={() => setActiveTab('Pesanan diterima')}
          className={activeTab === 'Pesanan diterima' ? 'active' : ''}
        >
          Selesai
        </button>
      </div>

      {Object.keys(filteredCheckoutProducts).length === 0 ? (
        <p>Tidak ada proses</p>
      ) : (
        Object.keys(filteredCheckoutProducts).map((checkoutId) => (
          <div key={checkoutId} className="checkout-table">
            <h2>{filteredCheckoutProducts[checkoutId][0]?.product?.product_owners?.name}</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Produk</th>
                    <th>Kuantitas</th>
                    <th>Total Bayar</th>
                    <th>Alamat Pengiriman</th>
                    <th>Metode Pengiriman</th>
                    <th>Status Pengiriman</th>
                    <th>PPN</th>
                    <th>Tanggal Belanja</th>
                    <th>Status Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(checkoutProducts[checkoutId]) &&
                    checkoutProducts[checkoutId].map((productInfo, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`/my-order/${productInfo.checkout.id}`}>
                            <div className="product-info">
                              <img
                              style={{borderRadius: '5px'}}
                                src={productInfo.product.image}
                                alt={productInfo.product.name}
                              />
                            </div>
                          </Link>
                        </td>
                              <td>{productInfo.product.name}</td>
                        <td>{productInfo.quantity}</td>
                        <td>{productInfo.checkout.totalPrice}</td>
                        <td>{productInfo.checkout.shippingAddress}</td>
                        <td>{productInfo.checkout.shippingMethod}</td>
                        <td>{productInfo.checkout.deliveryStatus}</td>
                        <td>{productInfo.checkout.setPPN}</td>
                        <td>{productInfo.createdAt}</td>
                        <td>{productInfo.checkout.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* <button className="buy-again-button">Beli lagi</button> */}
          </div>
        ))
      )}
    </div>
  );
}

export default CheckoutProductsPage;
