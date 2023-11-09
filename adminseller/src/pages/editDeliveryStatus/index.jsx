import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditCheckout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    useEffect(() => {
        // Fetch data as before
        fetch(`http://localhost:3100/checkouts/${id}`)
            .then(response => response.json())
            .then(data => {
                setDeliveryStatus(data.deliveryStatus);
                setTrackingNumber(data.trackingNumber);
            });
    }, [id]);

    const handleDeliveryStatusChange = (event) => {
        setDeliveryStatus(event.target.value);
    };

    const handleTrackingNumberChange = (event) => {
        setTrackingNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send the HTTP request as before
        fetch(`http://localhost:3100/checkouts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.getItem('access_token')
            },
            body: JSON.stringify({ deliveryStatus, trackingNumber }),
        })
            .then(response => {
                if (response.status === 201) {
                    alert('ok');
                    navigate('/order-list');
                } else {
                    alert('error');
                }
            });
    };

    return (
        <div>
            <h2>Edit Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deliveryStatus">Delivery Status:</label>
                    <select
                        id="deliveryStatus"
                        value={deliveryStatus}
                        onChange={handleDeliveryStatusChange}
                        required
                    >
                        <option value="Sedang dikemas">Sedang dikemas</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Menunggu pembeli">Menunggu pembeli</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="trackingNumber">Tracking Number:</label>
                    <input
                        type="text"
                        id="trackingNumber"
                        value={trackingNumber}
                        onChange={handleTrackingNumberChange}  
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditCheckout;
