import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  // background-color: #f8f8f8;
`;

const CheckoutCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
`;

const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
`;

const Subtitle = styled.h3`
  margin: 0;
  color: #777;
`;

const Price = styled.p`
  font-weight: bold;
  color: #007bff;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const ProductImage = styled.img`
  width: 80px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Qty = styled.p`
  font-weight: bold;
  color: #555;
`;

const SearchInput = styled.input`
  width: 98%; /* Gunakan lebar faktur sebagai referensi */
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 5px;
  margin-bottom: 20px;
  :focus {
    outline: none;
    border-color: #0056b3;
  }
`;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const CheckoutList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((checkout) =>
    checkout.checkout?.users?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkout.products.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container>
      <SearchInput
          type="text"
          placeholder="Search by User or Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      {filteredData.map((checkout) => (
        <CheckoutCard key={checkout.checkout.id}>
          <CheckoutHeader>
            <Title>Invoice #{checkout.checkout.id}</Title>
            <Subtitle>Order Date: {new Date(checkout.checkout.createdAt).toLocaleString()}</Subtitle>
          </CheckoutHeader>
          <Subtitle>User: {checkout.checkout?.users?.fullName}</Subtitle>
          <Subtitle>Shipping Address: {checkout.checkout.shippingAddress}</Subtitle>
          <Price>Total Price: {formatCurrency(checkout.checkout.totalPrice)}</Price>
          <p>Payment Status: {checkout.checkout.paymentStatus}</p>
          <p>Shipping Method: {checkout.checkout.shippingMethod}</p>
          <p>
            Delivery Status:{' '}
            <Link to={`/${checkout.checkout.id}`}>{checkout.checkout.deliveryStatus}</Link>
          </p>
          <ProductList>
            {checkout.products.map((product) => (
              <ProductItem key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <p>Description: {product.description}</p>
                </div>
                <Qty>Qty: {1}</Qty>
                <Price>{formatCurrency(product.unitPrice)}</Price>
              </ProductItem>
            ))}
          </ProductList>
        </CheckoutCard>
      ))}
    </Container>
  );
};

export default CheckoutList;
