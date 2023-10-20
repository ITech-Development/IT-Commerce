import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CheckoutProductsPage.css";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState({});
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => {
    fetch(
      "https://indoteknikserver-732012365989.herokuapp.com/checkout-products",
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCheckoutProducts(data))
      .catch((error) => console.error(error));
  }, []);

  function formatPrice(price) {
    const priceString = price.toString();
    const parts = priceString.split('.');
    const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decimalPart;
}

  const filteredCheckoutProducts = Object.keys(checkoutProducts).reduce(
    (result, checkoutId) => {
      const checkout = checkoutProducts[checkoutId][0]?.checkout;
      if (activeTab === "Semua" || checkout?.deliveryStatus === activeTab) {
        result[checkoutId] = checkoutProducts[checkoutId];
      }
      return result;
    },
    {}
  );

  return (
    <div className="checkout-container">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("Semua")}
          className={activeTab === "Semua" ? "active" : ""}
        >
          Semua
        </button>
        <button
          onClick={() => setActiveTab("Sedang dikemas")}
          className={activeTab === "Sedang dikemas" ? "active" : ""}
        >
          Sedang dikemas
        </button>
        <button
          onClick={() => setActiveTab("Dikirim")}
          className={activeTab === "Dikirim" ? "active" : ""}
        >
          Dikirim
        </button>
        <button
          onClick={() => setActiveTab("Pesanan diterima")}
          className={activeTab === "Pesanan diterima" ? "active" : ""}
        >
          Selesai
        </button>
      </div>

      {Object.keys(filteredCheckoutProducts).length === 0 ? (
        <p>Tidak ada proses</p>
      ) : (
        Object.keys(filteredCheckoutProducts).map((checkoutId) => (
          <div key={checkoutId} className="checkout-table">
            <h2 className="titleCheck">
              {
                filteredCheckoutProducts[checkoutId][0]?.product?.product_owners
                  ?.name
              }
            </h2>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead">
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
                      <tr className="contentTable" key={index}>
                        <td>
                          <Link to={`/my-order/${productInfo.checkout.id}`}>
                            <div className="product-info">
                              <img
                                style={{ borderRadius: "5px" }}
                                src={productInfo.product.image}
                                alt={productInfo.product.name}
                              />
                            </div>
                          </Link>
                        </td>
                        <td>{productInfo.product.name}</td>
                        <td>{productInfo.quantity}</td>
                        <td>{formatPrice(productInfo.checkout.totalPrice)}</td>
                        <td className="address">{productInfo.checkout.shippingAddress}</td>
                        <td>{productInfo.checkout.shippingMethod}</td>
                        <td>{productInfo.checkout.deliveryStatus}</td>
                        <td>{productInfo.checkout.setPPN}</td>
                        <td className="timeorder">{productInfo.createdAt}</td>
                        <td>{productInfo.checkout.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CheckoutProductsPage;
