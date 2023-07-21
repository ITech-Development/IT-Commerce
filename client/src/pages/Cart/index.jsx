import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTotals } from "../../features/cartSlice";
import styled from "styled-components";

const ContinueShoppingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ContinueShoppingIcon = styled.span`
  margin-right: 5px;
`;

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    const fetchCarts = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3100/product-carts",
            { headers: { access_token: accessToken } }
          );
          setCarts(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCarts();
  }, []);

  const handleIncrement = (id) => {
    updateCartItemQuantity(id, "increment");
  };

  const handleDecrement = (id) => {
    updateCartItemQuantity(id, "decrement");
  };

  const handleRemove = (id) => {
    updateCartItemQuantity(id, "remove");
  };

  const handleClear = () => {
    updateCartItemQuantity(null, "clear");
  };

  const updateCartItemQuantity = async (id, action) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = `http://localhost:3100/product-carts/${action}`;
      if (id) {
        url += `/${id}`;
      }

      try {
        const response = await axios.patch(url, null, {
          headers: { access_token: accessToken },
        });
        setCarts(response.data);
      } catch (error) {
        console.log(`${action} error`, error);
      }
    }
  };

  const calculateSubtotal = () => {
    return carts.reduce((total, cartItem) => {
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

  const calculatePPN = () => {
    const subtotal = calculateSubtotal();
    const ppn = subtotal * 0.11;
    return ppn.toFixed(2);
  };

  return (
    <>
      <div
        className="cart-container"
        style={{ position: "relative", top: "80px" }}
      >
        <h2>Shopping Cart</h2>
        {carts.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <div className="start-shopping">
              <Link to="/productlist">
                <span>&lt;</span>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {carts?.map((cartItem) => (
                <div key={cartItem.id} className="cart-item">
                  <div className="cart-product">
                    <img
                      src={cartItem.product.image}
                      alt={cartItem.product.image}
                    />
                    <div>
                      <h3>{cartItem.product.name}</h3>
                      <p>{cartItem.product.description}</p>
                      <button onClick={() => handleRemove(cartItem.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">
                    Rp.{cartItem.product.unitPrice}
                  </div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecrement(cartItem.id)}>
                      -
                    </button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => handleIncrement(cartItem.id)}>
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    Rp.{cartItem.quantity * cartItem.product.unitPrice}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-cart" onClick={handleClear}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal :</span>
                  <span className="amount">Rp.{calculateSubtotal()}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontStyle: "italic",
                    padding: "8px 0",
                  }}
                >
                  <span>PPN 11% :</span>
                  <span className="amount"> Rp. {calculatePPN()}</span>
                </div>
                <div className="subtotal" style={{ paddingBottom: "10px" }}>
                  <span>Total :</span>
                  <span style={{ fontWeight: "700" }} className="amount">
                    {calculateTotal()}
                  </span>
                </div>
                <button style={checkoutButtonStyle}>
                  <Link to="/shipping" style={linkStyle}>
                    Check Out
                  </Link>
                </button>
                <ContinueShoppingContainer>
                  <ContinueShoppingIcon>&lt;</ContinueShoppingIcon>
                  <Link to="/productlist">Continue Shopping</Link>
                </ContinueShoppingContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const checkoutButtonStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default Cart;
