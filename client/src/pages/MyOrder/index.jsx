import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutProductsPage.css';
import DetailsTransaction from './DetailsTransaction';

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  const [activeTab, setActiveTab] = useState('Semua'); // Default active tab is 'Semua'
  const [searchQuery, setSearchQuery] = useState('');
  // State to manage detailed transaction modal visibility and data
  const [isDetailsTransaction, setDetailsTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  // Function to open details transaction modal
  const openDetailsTransaction = (checkout, products) => {
    setSelectedTransaction(checkout);
    setSelectedProducts(products);
    setDetailsTransaction(true);
  };

  const closeDetailsTransaction = () => {
    setDetailsTransaction(false);
  };


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

  // Filter the checkoutProducts based on the activeTab
  const filteredCheckoutProducts = Object.keys(checkoutProducts).reduce((result, checkoutId) => {
    const checkout = checkoutProducts[checkoutId][0]?.checkout;
    const products = checkoutProducts[checkoutId].filter((productInfo) =>
      productInfo.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if ((activeTab === 'Semua' || checkout?.deliveryStatus === activeTab) && products.length > 0) {
      result[checkoutId] = products;
    }

    return result;
  }, {});


  return (
    <div>

      <div className="tabs">
        <button onClick={() => setActiveTab('Semua')} className={activeTab === 'Semua' ? 'active' : ''}>Semua</button>
        <button onClick={() => setActiveTab('Sedang dikemas')} className={activeTab === 'Sedang dikemas' ? 'active' : ''}>Sedang dikemas</button>
        <button onClick={() => setActiveTab('Dikirim')} className={activeTab === 'Dikirim' ? 'active' : ''}>Dikirim</button>
        <button onClick={() => setActiveTab('Pesanan diterima')} className={activeTab === 'Pesanan diterima' ? 'active' : ''}>Selesai</button>
      </div>

      <div className='searchMyOrder'>
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      {Object.keys(filteredCheckoutProducts).length === 0 ? (
        <p>Tidak ada proses</p>
      ) : (
        Object.keys(filteredCheckoutProducts).map(checkoutId => (
          <div key={checkoutId} className="checkout-table">
            <h5>Invoice {filteredCheckoutProducts[checkoutId][0].checkout.midtransCode}</h5>
            <p>{new Date(filteredCheckoutProducts[checkoutId][0].checkout.createdAt).toLocaleDateString('id-ID')}</p>
            <p><b>{filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus}</b></p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Belanja</th>
                    <th>Kuantitas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCheckoutProducts[checkoutId].map((productInfo, index) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Total Belanja <b> Rp. {filteredCheckoutProducts[checkoutId][0].checkout.totalPrice}</b></p>
            <p onClick={() => openDetailsTransaction(filteredCheckoutProducts[checkoutId][0].checkout, filteredCheckoutProducts[checkoutId])}>
              Lihat Detail Transaksi
            </p>
            {/* DetailsTransaction */}
            {isDetailsTransaction && selectedTransaction && selectedProducts && (
              <DetailsTransaction onClose={() => setDetailsTransaction(false)} checkoutDetails={selectedTransaction} products={selectedProducts}>
                {/* You can include additional content here if needed */}
              </DetailsTransaction>
            )}
            <button>Ulasan</button>
            <button className="buy-again-button">Beli lagi</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CheckoutProductsPage;