import React, { useState } from "react";
import styled from 'styled-components';

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  max-width: 100%;
`;

const CartHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const CartRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const CartData = styled.td`
  padding: 10px;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
`;

const CheckoutDetailsRow = ({ checkout }) => (
  <CartRow>
    <CartData>Checkout ID:</CartData>
    <CartData>{checkout.checkout.id}</CartData>
    <CartData>Total Price:</CartData>
    <CartData>{checkout.checkout.totalPrice}</CartData>
  </CartRow>
);

const ProductRow = ({ product }) => (
  <CartRow key={product.id}>
    <CartData>
      <img src={product.image} alt={product.name} width='100px' />
    </CartData>
    <CartData>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
    </CartData>
    <CartData>Unit Price:</CartData>
    <CartData>{product.unitPrice}</CartData>
  </CartRow>
);

const CheckoutList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCheckouts = data.filter((checkout) =>
    checkout.checkout?.users?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search by User Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCheckouts.map((checkout) => (
        <CartTable key={checkout.checkout.id}>
          <thead>
            <tr>
              <CartHeader colSpan="2">Checkout Details</CartHeader>
              <CartHeader colSpan="2">Product Details</CartHeader>
            </tr>
          </thead>
          <tbody>
            <CheckoutDetailsRow checkout={checkout} />
            <CartRow>
              <CartData>User:</CartData>
              <CartData>{checkout.checkout?.users?.fullName}</CartData>
              <CartData>Shipping Address:</CartData>
              <CartData>{checkout.checkout.shippingAddress}</CartData>
            </CartRow>
            <CartRow>
              <CartData>Order Date:</CartData>
              <CartData>{checkout.checkout.createdAt}</CartData>
              <CartData>Qty:</CartData>
              <CartData>{checkout.products.length}</CartData>
            </CartRow>
          </tbody>
          <tbody>
            {checkout.products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </CartTable>
      ))}
    </div>
  );
};

export default CheckoutList;
