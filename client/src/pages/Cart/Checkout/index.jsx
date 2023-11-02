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
import './itCart.css'

function Checkout({ carts }) {
  const isCheckoutDisabled = carts?.some(
    (cartItem) => cartItem.product.stock <= 0
  );

  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [incrementCartItem] = useIncrementCartItemMutation();
  const [decrementCartItem] = useDecrementCartItemMutation();

  const handlerInc = (id) => {
    incrementCartItem(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerDec = (id) => {
    decrementCartItem(id);
  };

  const handlerRemove = (id) => {
    removeItemFromCart(id);
  };

  //
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


  function formatPrice(price) {
    const priceString = price.toString();
    const parts = priceString.split('.');
    const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decimalPart;
}

  return (
    <div
      className="cart-container"
      style={{ position: "relative", top: "50px" }}
    >
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
                  {/* <Description>
                    {e.product.description.split(" ").slice(0, 15).join(" ")}
                    ...
                  </Description> */}
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
                <button className="plusCart" onClick={() => handlerInc(e.id)}>+</button>
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
              {formatPrice(calculateTotal())}
              </span>
            </div>
            <button className='checkoutButtonStyle' disabled={isCheckoutDisabled}>
              <Link to="/pay-now" style={linkStyle}>
                {!isCheckoutDisabled ? "Checkout" : "Stok produk kosong"}
              </Link>
            </button>
            {/* <ContinueShoppingContainer>
              <ContinueShoppingIcon>&lt;</ContinueShoppingIcon>
              <Link to="/productlist">Beli Lagi</Link>
            </ContinueShoppingContainer> */}
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
    // margin-right: 30px;
  }
`;
// const checkoutButtonStyle = styled.button {
//   backgroundColor: "blue",
//   color: "white",
//   padding: "10px 20px",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
//   textDecoration: "none",
//   marginBottom: '50px'
  
// };

const linkStyle = {
  color: "white",
  textDecoration: "none",
};
