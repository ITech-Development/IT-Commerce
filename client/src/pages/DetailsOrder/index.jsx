import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const OrderDetail = ({ match }) => {
    const [order, setOrder] = useState({});
    const { id } = useParams() // Ambil ID order dari parameter URL
    console.log(order, 'test');

    useEffect(() => {
        // Simulasi pengambilan data order dari API atau sumber data lainnya
        fetch(`http://localhost:3100/checkout-products/${id}`)
            .then(response => response.json())
            .then(data => setOrder(data))
            .catch(error => console.error('Error fetching order:', error));
    }, [id]);

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div>
                <Link to='/my-order'>
                <button>Kembali</button>
                </Link>
            </div>
            <h2>Detail Order {id}</h2>
            <p>No. Pesanan: {order.checkouts?.midtransCode}</p>
            <p>Order Status: {order.checkouts?.paymentStatus}</p>
            <p>Customer Name: {order.checkouts?.users?.fullName}</p>
            <p>Alamat Pengiriman: {order.checkouts?.shippingAddress}</p>
            <p>Items:</p>
            <ul>
                {order.items &&
                    order.items.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.quantity}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default OrderDetail;
