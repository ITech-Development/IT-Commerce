import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  margin: auto;
  padding: 50px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin: auto;
  text-align: center;
  padding-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Select = styled.select`
  width: 220px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function EditCheckout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deliveryStatus, setDeliveryStatus] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    useEffect(() => {
        // Fetch data as before
        fetch(`https://indoteknikserver-732012365989.herokuapp.com/checkouts/${id}`)
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
        fetch(`https://indoteknikserver-732012365989.herokuapp.com/checkouts/${id}`, {
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
    <div style={{marginTop: '200px'}}>

    <Container>
      <Title>Edit Status Pesanan</Title>
      <Form onSubmit={handleSubmit}>
        <div>
            <h2>Edit Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deliveryStatus">Delivery Status:</label>
                    <Select
                        id="deliveryStatus"
                        value={deliveryStatus}
                        onChange={handleDeliveryStatusChange}
                        required
                    >
                        <option value="Sedang dikemas">Sedang dikemas</option>
                        <option value="Dikirim">Dikirim</option>
                        {/* Add more options as needed */}
                    </Select>
                </div>
                <div>
                    <label htmlFor="trackingNumber">Tracking Number:</label>
                    <input
                        type="text"
                        id="trackingNumber"
                        value={trackingNumber}
                        onChange={handleTrackingNumberChange}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
    </div>
  );
}

export default EditCheckout;
