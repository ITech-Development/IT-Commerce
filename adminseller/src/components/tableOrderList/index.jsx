import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import './orderTable.css'

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
  line-height: 17px;
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
  font-size: 18px;
`;

const Subtitle = styled.h3`
  margin: 0;
  padding-top: 15px;
  // color: #777;
  font-size: 18px;

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
  margin: 50px 30px 15px 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const ProductImage = styled.img`
  width: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const ProductName = styled.p`
  width: 700px;
  font-weight: 500;
`;

const Qty = styled.p`
  font-weight: bold;
  // color: #555;
  padding-right: 60px;
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

const DeliveryButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none; /* Menghilangkan garis bawah dari tautan */
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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
              Waktu Pesanan :{" "}
              {new Date(checkout.checkout.createdAt).toLocaleString()}
            </Subtitle>
          </CheckoutHeader>
          <Subtitle>Pembeli : {checkout.checkout?.users?.fullName}</Subtitle>
          <Price>
            Total Bayar : {formatCurrency(checkout.checkout.totalPrice)}
          </Price>
          <p>Status Pembayaran : {checkout.checkout.paymentStatus}</p>
          <p>Metode Pengiriman : {checkout.checkout.shippingMethod}</p>
          <p>Alamat Pengiriman : {checkout.checkout.shippingAddress}</p>
          <p>
            Status Produk :{" "}
            <DeliveryButton to={`${checkout.checkout.id}`}>
              {checkout.checkout.deliveryStatus}
            </DeliveryButton>
          </p>{" "}
          <ProductList>
          <h3>Pesanan Produk :</h3>
            {checkout.products.map((product) => (
              <ProductItem key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <div>
                  <ProductName className="OrPro">{product.name}</ProductName>
                  {/* <p>Description: {product.description}</p> */}
                </div>
                <Qty>x {1}</Qty>
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
