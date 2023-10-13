import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CheckoutProductsPage() {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const navigate = useNavigate();
    const [deliveryStatus, setDeliveryStatus] = useState('');

    useEffect(() => {
        // Fetch data as before
        fetch(`http://localhost:3100/checkouts/${id}`)
            .then(response => response.json())
            .then(data => setDeliveryStatus(data.deliveryStatus));
    }, [id]);

    const handleDeliveryStatusChange = () => {
        // Set the delivery status directly since there's only one option
        setDeliveryStatus('Pesanan diterima');

        // Send the HTTP request immediately after changing the status
        fetch(`http://localhost:3100/checkouts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify({ deliveryStatus: 'Pesanan diterima' }),
        })
            .then(response => {
                if (response.status === 201) {
                    console.log('ok, berhasil');
                } else {
                    alert('error');
                }
            });
    };

    useEffect(() => {
        async function fetchCheckoutProducts() {
            try {
                const response = await axios.get(`http://localhost:3100/checkout-products/${id}`, {
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h2>Detail Order</h2>
            <p>Order Id: {checkoutProducts[0].checkout.midtransCode}</p>
            <p>Alamat Pengiriman: {checkoutProducts[0].checkout.shippingAddress}</p>
            <p>Status Pengiriman: {checkoutProducts[0].checkout.deliveryStatus}</p>

            {checkoutProducts[0].checkout.deliveryStatus === 'Dikirim' && (
                <div>
                    <div>
                        {/* <label htmlFor="deliveryStatus">Delivery Status:</label> */}
                        <button type="button" onClick={handleDeliveryStatusChange}>Pesanan diterima</button>
                    </div>
                </div>
            )}


            {checkoutProducts.map((checkoutProduct, index) => (
                <div key={index}>
                    <hr />
                    <h3>{checkoutProduct.product.name}</h3>
                    <img src={checkoutProduct.product.image} alt={checkoutProduct.product.name} width="100px" />
                    <p>x: {checkoutProduct.quantity}</p>
                    <p>Created At: {checkoutProduct.createdAt}</p>
                </div>
            ))}
        </div>
    );
}

export default CheckoutProductsPage;
