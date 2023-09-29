import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function CheckoutProductsPage() {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    console.log(checkoutProducts, 'test test');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

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
            {checkoutProducts.map((checkoutProduct, index) => (
                <div key={index}>
                    <hr/>
                    <h3>{checkoutProduct.product.name}</h3>
                    <img src={checkoutProduct.product.image} alt={checkoutProduct.product.name} width="100px"/>
                    <p>x: {checkoutProduct.quantity}</p>
                    <p>Created At: {checkoutProduct.createdAt}</p>
                </div>
            ))}
        </div>
    );
}

export default CheckoutProductsPage;
