import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  margin: 0 30px;
`;

const CheckoutCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 7px;
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
  padding-top: 15px;
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

const SearchInput = styled.input`
  width: 98.5%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 5px;
  margin: 30px 30px 20px 0;
  :focus {
    outline: none;
    border-color: #0056b3;
  }
`;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CheckoutList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (checkout) =>
      checkout.checkout?.users?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
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
            <Title>Invoice : {checkout.checkout.midtransCode}</Title>
            <Subtitle>
              Waktu Belanja :{" "}
              {new Date(checkout.checkout.createdAt).toLocaleString()}
            </Subtitle>
          </CheckoutHeader>
          <Subtitle>Nama : {checkout.checkout?.users?.fullName}</Subtitle>
          <Price>
            Total Bayar: {formatCurrency(checkout.checkout.totalPrice)}
          </Price>
          <p>Alamat Pengiriman: {checkout.checkout.shippingAddress}</p>
          {/* <p>Order Date: {checkout.checkout.createdAt}</p> */}
          <h3>Products:</h3>
          <ProductList>
            {checkout.products.map((product) => (
              <ProductItem key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <p>
                    Description:{" "}
                    {product.description.split(" ").slice(0, 18).join(" ")}
                    ...
                  </p>
                </div>
                <p>x : {product.quantity}</p>
                <Price>{formatCurrency(product.unitPrice)}</Price>
              </ProductItem>
            ))}
          </ProductList>
          <div style={{ display: "flex", justifyContent: 'flex-end' }}>
            <h3>Status Bayar : </h3>
            <ul style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
              {checkout.checkout.paymentStatus === null
                ? "Belum Bayar"
                : checkout.checkout.paymentStatus}
            </ul>
          </div>
        </CheckoutCard>
      ))}
    </Container>
  );
};

export default CheckoutList;
