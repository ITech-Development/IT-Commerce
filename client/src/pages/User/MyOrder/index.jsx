import React, { useState, useEffect } from "react";
import "./myOrder.css";
import DetailsTransaction from "./DetailsTransaction";

function MyOrder() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  const [activeTab, setActiveTab] = useState("Semua"); // Default active tab is 'Semua'
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsTransaction, setDetailsTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const openDetailsTransaction = (checkout, products) => {
    setSelectedTransaction(checkout);
    setSelectedProducts(products);
    setDetailsTransaction(true);
  };

  useEffect(() => {
    fetch("https://indoteknikserver-732012365989.herokuapp.com/checkout-products", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setCheckoutProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredCheckoutProducts = Object.keys(checkoutProducts).reduce((result, checkoutId) => {
    const checkout = checkoutProducts[checkoutId][0]?.checkout;
    const products = checkoutProducts[checkoutId].filter((productInfo) =>
      productInfo.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if ((activeTab === "Semua" || checkout?.deliveryStatus === activeTab) && products.length > 0) {
      result[checkoutId] = products;
    }

    return result;
  }, {});

  return (
    <div>
      <div className="tabs">
        {["Semua", "Sedang dikemas", "Dikirim", "Pesanan diterima"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="searchMyOrder">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {Object.keys(filteredCheckoutProducts).length === 0 ? (
        <p className="checkout-table">Tidak ada proses</p>
      ) : (
        Object.keys(filteredCheckoutProducts).map((checkoutId) => (
          <div key={checkoutId} className="checkout-table">
            {/* Render checkout information */}
            <h5>Invoice {filteredCheckoutProducts[checkoutId][0].checkout.midtransCode}</h5>
            <p>{new Date(filteredCheckoutProducts[checkoutId][0].checkout.createdAt).toLocaleDateString("id-ID")}</p>
            <p><b>{filteredCheckoutProducts[checkoutId][0].checkout.deliveryStatus}</b></p>

            {/* Render products in a table */}
            <div className="table-responsive">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th>Belanja</th>
                    <th>Kuantitas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCheckoutProducts[checkoutId].map((productInfo, index) => (
                    <tr key={index}>
                      <td>
                        <div className="product-info">
                          <img src={productInfo.product.image} alt={productInfo.product.name} />
                          <span>{productInfo.product.name}</span>
                        </div>
                      </td>
                      <td>{productInfo.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Render total price */}
            <p>Total Belanja <b>Rp. {filteredCheckoutProducts[checkoutId][0].checkout.totalPrice}</b></p>

            {/* Button to view details transaction */}
            <p onClick={() => openDetailsTransaction(
              filteredCheckoutProducts[checkoutId][0].checkout,
              filteredCheckoutProducts[checkoutId]
            )}>
              Lihat Detail Transaksi
            </p>

            {/* DetailsTransaction */}
            {isDetailsTransaction && selectedTransaction && selectedProducts && (
              <DetailsTransaction
                onClose={() => setDetailsTransaction(false)}
                checkoutDetails={selectedTransaction}
                products={selectedProducts}
              >
                {/* You can include additional content here if needed */}
              </DetailsTransaction>
            )}

            {/* Action buttons */}
            <button>Ulasan</button>
            <button className="buy-again-button">Beli lagi</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrder;
