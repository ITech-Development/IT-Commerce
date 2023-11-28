import React from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

const DetailsTransaction = ({ onClose, checkoutDetails, products }) => {

    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

    // Calculate total product weight
    const totalProductWeight = products.reduce(
        (total, product) => total + product.quantity * product.product.weight,
        0
    );



    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="details-transaction-content">
                    {/* Render detailed transaction information here */}
                    <h3>Detail Transaksi</h3>
                    <hr />
                    <p><b>{checkoutDetails.deliveryStatus}</b></p>
                    <hr />
                    <p>No. Invoice <b>{checkoutDetails.midtransCode}</b></p>
                    <p>Tanggal Pembelian {new Date(checkoutDetails.createdAt).toLocaleString('id-ID')} WIB</p>
                    <hr />
                    {/* Render product details */}
                    <h4>Detail Produk</h4>
                    <b>{products[0].product.product_owners.name}</b>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                <p><b>{product.product.name}</b></p>
                                <img src={product.product.image} alt={product.product.name} width={'50px'} />
                                <p>{product.quantity} x Rp.{product.product.unitPrice}</p>
                                <p>Total Harga <b>{product.quantity * product.product.unitPrice}</b></p>
                                <button>Beli Lagi</button>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    {/* Add more details as needed */}
                    <h4>Info Pengiriman</h4>
                    <div>
                        {checkoutDetails.isPickUpInStore === false ? (
                            <div>
                                <p >Kurir : {checkoutDetails.shippingMethod === null ? '-' : checkoutDetails.shippingMethod.toUpperCase()}
                                </p>
                                <p>No Resi: {checkoutDetails.trackingNumber === null ? '-' : checkoutDetails.trackingNumber}</p>
                                <p>Alamat: {checkoutDetails.shippingAddress}</p>
                            </div>
                        ) : (
                            <div>
                                <p >Ambil di Toko :</p>
                                <p>
                                    Ya
                                </p>
                                <p>
                                    <i> Biaya layanan Ambil di Toko dikenakan 11%</i>
                                </p>
                            </div>
                        )}
                    </div>
                    <hr />
                    <h4>Rincian Pembayaran</h4>
                    <p>Metode Pembayaran {checkoutDetails.paymentMethod === null ? '-' : checkoutDetails.paymentMethod.toUpperCase()}</p>
                    <p>Total Harga({totalQuantity} barang) Rp{products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0)}</p>
                    <p>Total Ongkos Kirim ({totalProductWeight} gr) Rp{checkoutDetails.shippingCost === null ? '-' : checkoutDetails.shippingCost}</p>
                    <p>Diskon Ongkos Kirim Rp-</p>
                    <p>Biaya Asuransi Pengiriman Rp-</p>
                    <p>PPN (11%) Rp{checkoutDetails.setPPN}</p>
                    <p>Diskon Belanja (6%) Rp{((products.reduce((total, product) => total + product.quantity * product.product.unitPrice, 0) * 6) / 100).toFixed(2)}</p>
                    <p><b>Total Belanja Rp{checkoutDetails.totalPrice}</b></p>
                    <hr />
                    <button>Chat Admin</button>
                    <button>Bantuan</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsTransaction;
