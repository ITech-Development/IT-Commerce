import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CheckoutProductsPage.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CheckoutProductsPage() {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const invoiceRef = useRef(null);

    useEffect(() => {
        async function fetchCheckoutProducts() {
            try {
                const response = await axios.get(`https://indoteknikserver-732012365989.herokuapp.com/checkout-products/${id}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                setCheckoutProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching checkout products:', error);
            }
        }

        fetchCheckoutProducts();
    }, [id]);

    function downloadInvoiceAsPDF() {
        if (invoiceRef.current) {
            html2canvas(invoiceRef.current).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm');
                const pdfWidth = 210;
                const pdfHeight = pdf.internal.pageSize.height;
                const position = 0;
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                pdf.save('invoice.pdf');
            });
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="checkout-page" ref={invoiceRef}>
            <div className="invoice-header">
                <h2>Invoice</h2>
                <div className="invoice-details">
                    <p>Invoice Id: {checkoutProducts[0].checkout.midtransCode}</p>
                    <p>Alamat Pengiriman: {checkoutProducts[0].checkout.shippingAddress}</p>
                </div>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Gambar</th>
                        <th>Jumlah</th>
                        <th>Belanja Pada</th>
                    </tr>
                </thead>
                <tbody>
                    {checkoutProducts.map((checkoutProduct, index) => (
                        <tr key={index}>
                            <td>{checkoutProduct.product.name}</td>
                            <td><img src={checkoutProduct.product.image} alt={checkoutProduct.product.name} width="100px" /></td>
                            <td>{checkoutProduct.quantity}</td>
                            <td>{checkoutProduct.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={downloadInvoiceAsPDF}>Download Invoice as PDF</button>
        </div>
    );
}

export default CheckoutProductsPage;
