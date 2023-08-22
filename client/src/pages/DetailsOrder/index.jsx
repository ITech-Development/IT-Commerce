import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function CheckoutProductsPage() {
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    console.log(checkoutProducts, 'test test');
    const [loading, setLoading] = useState(true);

    // const { checkoutId } = useParams(); // Extract checkoutId from useParams

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
            <h2>Checkout Products</h2>
            {checkoutProducts.map((checkoutProduct, index) => (
                <div key={index}>
                    <h3>Product: {checkoutProduct.product.name}</h3>
                    <p>Quantity: {checkoutProduct.quantity}</p>
                    <p>Created At: {checkoutProduct.createdAt}</p>
                </div>
            ))}
        </div>
    );
}

export default CheckoutProductsPage;
