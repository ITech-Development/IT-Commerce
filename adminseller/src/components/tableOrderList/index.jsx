import React, { useState } from "react";
import styled from "styled-components";

const CheckoutWrapper = styled.div`
  width: 1420px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
  width: 100%;
  transition: background-color 0.3s ease-in-out; /* Animasi perubahan warna */
`;

const CartData = styled.td`
  padding: 10px;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  font-size: 16px;

  &:hover {
    border-color: #007bff; /* Perubahan warna saat menggerakkan kursor */
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Bayangan saat elemen fokus */
  }
`;

const DetailsAndProductRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CheckoutDetails = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const ShowButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
`;

// CheckoutList component
const CheckoutList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shownCheckoutIds, setShownCheckoutIds] = useState([]);

  const isMatch = (text) =>
    text.toLowerCase().includes(searchTerm.toLowerCase());

  const toggleCheckout = (checkoutId) => {
    if (shownCheckoutIds.includes(checkoutId)) {
      setShownCheckoutIds(shownCheckoutIds.filter((id) => id !== checkoutId));
    } else {
      setShownCheckoutIds([...shownCheckoutIds, checkoutId]);
    }
  };

  const isCheckoutShown = (checkoutId) => shownCheckoutIds.includes(checkoutId);

  const filteredCheckouts = data.filter((checkout) => {
    const userName = checkout.checkout?.users?.fullName || "";
    const products = checkout.products || [];

    if (isMatch(userName)) {
      return true;
    }

    return false;
  });

  return (
    <CheckoutWrapper>
      <SearchInput
        type="text"
        placeholder="Search by User Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCheckouts.map((checkout) => (
        <div key={checkout.checkout.id}>
          <DetailsAndProductRow>
            <CheckoutDetails>
              <CartTable>
                <tbody>
                  <CartRow>
                    <CartHeader>Checkout Details</CartHeader>
                  </CartRow>
                  <CartRow>
                    <CartData>User:</CartData>
                    <CartData>{checkout.checkout?.users?.fullName}</CartData>
                  </CartRow>
                  <CartRow>
                    <CartData>Order Date:</CartData>
                    <CartData>{checkout.checkout.createdAt}</CartData>
                  </CartRow>
                </tbody>
              </CartTable>
              <ShowButton onClick={() => toggleCheckout(checkout.checkout.id)}>
                {isCheckoutShown(checkout.checkout.id)
                  ? "Hide Products"
                  : "Show Products"}
              </ShowButton>
            </CheckoutDetails>
            <ProductDetails
              style={{
                opacity: isCheckoutShown(checkout.checkout.id) ? 1 : 0,
                transform: `translateY(${
                  isCheckoutShown(checkout.checkout.id) ? 0 : 20
                }px)`,
              }}
            >
              <CartTable>
                <tbody>
                  <CartRow>
                    <CartHeader>Product List</CartHeader>
                  </CartRow>
                  {checkout.products.map((product) => (
                    <CartRow key={product.id}>
                      <CartData>
                        <img
                          src={product.image}
                          alt={product.name}
                          width="100px"
                        />
                      </CartData>
                      <CartData>
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                      </CartData>
                      <CartData>Unit Price:</CartData>
                      <CartData>{product.unitPrice}</CartData>
                    </CartRow>
                  ))}
                </tbody>
              </CartTable>
            </ProductDetails>
          </DetailsAndProductRow>
        </div>
      ))}
    </CheckoutWrapper>
  );
};

export default CheckoutList;
