import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useRemoveItemFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} from "../../../features/cart/apiCarts";
import "./itCart.css";

function Checkout({ carts }) {
  const handlerInc = (id) => {
    incrementCartItem(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isCheckoutDisabled = carts?.some(
    (cartItem) => cartItem.product.stock <= 0
  );
  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();

  const handlerDec = (id) => {
    decrementCartItem(id);
  };

  const handlerRemove = (id) => {
    removeItemFromCart(id);
  };

  const calculateSubtotal = () => {
    return carts?.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;
    return total.toFixed(2);
  };

  return (
    <div className="cart-container" style={{ marginTop: "100px" }}>
      <div>
        <div className="titles">
          <H3 className="product-title">Produk</H3>
          <H3 className="price">Harga</H3>
          <H3 className="quantity">Kuantitas</H3>
          <H3 className="total">Total Harga</H3>
        </div>
        <div class="cart-items">
          {carts?.map((e) => (
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
              <div className="cart-product-price">Rp.{e.product.unitPrice}</div>
              <div className="cart-product-quantity">
                <button onClick={() => handlerDec(e.id)}>-</button>
                <div className="count">{e.quantity}</div>
                <button onClick={() => handlerInc(e.id)}>+</button>
              </div>
              <div className="cart-product-total-price">
                Rp.{e.quantity * e.product.unitPrice}
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
                {calculateTotal()}
              </span>
            </div>
            <button
              className="checkoutButtonStyle"
              disabled={isCheckoutDisabled} // Disable the button if any product is out of stock
            >
              <Link to="/pay-now" style={linkStyle}>
                {!isCheckoutDisabled ? "Checkout" : "Stok produk kosong"}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

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
