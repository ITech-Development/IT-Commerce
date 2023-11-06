import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Back from "../../../assets/back-button.png";
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
    const total = subtotal;
    return total;
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page in the browsing history
  };

  return (
    <div className="cart-container" style={{ marginTop: "55px" }}>
      <div>
        <Link className="backCart" onClick={handleGoBack}>
          <img className="back" src={Back} alt="Back" />
          <h3 className="cartTitle">Kembali</h3>
        </Link>
      </div>

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
                  <Title>{e.product.name}</Title>
                  <button onClick={() => handlerRemove(e.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Hapus
                  </button>
                </SectionLeft>
              </div>
              <div className="cart-product-price">
                Rp.{e.product.unitPrice.toLocaleString("id-ID", {})}
              </div>
              <div className="cart-product-quantity">
                <button onClick={() => handlerDec(e.id)}>-</button>
                <div className="count">{e.quantity}</div>
                <button
                  style={{ marginTop: "5px" }}
                  onClick={() => handlerInc(e.id)}
                >
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
                {typeof calculateTotal() === "number"
                  ? calculateTotal().toLocaleString("id-ID")
                  : ""}
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

const ProductImageContainer = styled.div`
  width: 100px; /* Set a fixed width for the container */
  height: auto; /* Set a fixed height for the container */
  margin-right: 20px; /* Add some margin to separate the images */

  @media (max-width: 768px) {
    width: 80px; /* Adjust the width for smaller screens */
    height: 80px; /* Adjust the height for smaller screens */
    margin-right: 35px; /* Adjust the margin for smaller screens */
  }
`;

const ProductImage = styled.img`
  width: auto; /* Ensure the image takes the full width of the container */
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
    font-size: 12px;
    padding-top: 12px;
  }
`;

const linkStyle = {
  color: "white",
  textDecoration: "none",
};
