import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Itech from "../../../assets/Itech.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FaShoppingCart } from "react-icons/fa"
import "./itCart.css";

import {
  useRemoveItemFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} from "../../../features/cart/apiCarts";

function CartsItech({ cartsItech }) {
  const isCheckoutDisabled = cartsItech.some(
    (cartItem) => cartItem.product.stock <= 0
  );

  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();

  const handlerInc = (id) => {
    incrementCartItem(id);
  };

  const handlerDec = (id) => {
    decrementCartItem(id);
  };

  const handlerRemove = (id) => {
    removeItemFromCart(id);
  };

  //Itech
  const calculateSubtotalItech = () => {
    return cartsItech.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  const calculateTotalItech = () => {
    const subtotal = calculateSubtotalItech();
    // const ppn = subtotal * 0.11;
    const total = subtotal;
    return total.toFixed(2);
  };
  // const calculatePPNItech = () => {
  //   const subtotal = calculateSubtotalItech();
  //   const ppn = subtotal * 0.11;
  //   return ppn.toFixed(2);
  // };

  function formatPrice(price) {
    const priceString = price.toString();
    const parts = priceString.split(".");
    const decimalPart = parts[1] === "00" ? "" : `.${parts[1]}`;
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decimalPart;
  }

  return (
    <div
      className="cart-containers"
      style={{ position: "relative", top: "50px" }}
    >
      <StoreHeader>
        <img
          className="logoJuvindo"
          style={{ maxWidth: "16%" }}
          src={Itech}
          alt="Store Logo"
        />
        {/* <StoreTitle>ITech</StoreTitle> */}
      </StoreHeader>

      <div>
        <div className="titles">
          <H3 className="product-title">Produk</H3>
          <H3 className="price">Harga</H3>
          <H3 className="quantity">Kuantitas</H3>
          <H3 className="total">Total Harga</H3>
        </div>
        <div class="cart-items">
          {cartsItech?.map((e) => (
            <div class="cart-item">
              <div class="cart-product">
                <ProductImageContainer>
                  <Link to={`/products/${e.product.id}`}>
                    <ProductImage src={e.product.image} alt={e.product.name} />
                  </Link>
                </ProductImageContainer>

                <SectionLeft>
                  <Title>
                    {e.product.name.split(" ").slice(0, 15).join(" ")}
                    ...
                  </Title>
                  <button onClick={() => handlerRemove(e.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Hapus
                  </button>
                </SectionLeft>
              </div>
              <div className="cart-product-price">
                Rp.{e.product.unitPrice.toLocaleString("id-ID")}
              </div>
              <div className="cart-product-quantity">
                <button onClick={() => handlerDec(e.id)}>-</button>
                <div className="count">{e.quantity}</div>
                <button className="plusCart" onClick={() => handlerInc(e.id)}>
                  +
                </button>
              </div>
              <div className="cart-product-total-price">
                Rp.
                {(e.quantity * e.product.unitPrice).toLocaleString("id-ID", {})}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <p></p>
          <div className="cart-checkout">
            <div className="subtotal" style={{ paddingBottom: "10px" }}>
              <span className="subtot">Total :</span>
              <span style={{ fontWeight: "700" }} className="amount">
                {formatPrice(calculateTotalItech())}
              </span>
            </div>
            <button
              className="checkoutButtonStyle"
              disabled={isCheckoutDisabled}
            >
              <Link to="/check-TransITech" style={linkStyle}>
                {!isCheckoutDisabled ? "Checkout" : "Stok produk kosong"}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartsItech;

const ProductImage = styled.img`
  max-width: 180px;
  max-height: 100px;
`;

const ProductImageContainer = styled.div`
  margin-right: 20px;
  @media (max-width: 768px) {
    width: 180px;
  }
`;

const H3 = styled.div`
  font-weight: 500;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StoreHeader = styled.div`
  max-width: 900px;
  margin-top: 30px;
`;

const SectionLeft = styled.div`
  padding-left: 20px @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

const Title = styled.div`
  font-size: 16px;
  width: 90%;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
  }
`;

const linkStyle = {
  color: "white",
  textDecoration: "none",
};
