import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Input = styled.input`
  width: 94.5%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s; /* Menambahkan efek transisi pada warna latar belakang */
  
  &:hover {
    background-color: #0056b3; /* Warna saat tombol di-hover */
  }
`;
function EditCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    // Fetch data as before
    fetch(`https://indoteknikserver-732012365989.herokuapp.com/checkouts/${id}`)
      .then((response) => response.json())
      .then((data) => {
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
    fetch(
      `https://indoteknikserver-732012365989.herokuapp.com/checkouts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ deliveryStatus, trackingNumber }),
      }
    ).then((response) => {
      if (response.status === 201) {
        alert("ok");
        navigate("/order-list");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div style={{ marginTop: "200px" }}>
       <Container>
      <Title>Status Pesanan</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="deliveryStatus">Delivery Status:</Label>
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
        <div style={{ paddingTop: '15px'}}>
          <Label htmlFor="trackingNumber">Tracking Number:</Label>
          <Input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={handleTrackingNumberChange}
            required
          />
        </div>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
    </div>
  );
}

export default EditCheckout;
