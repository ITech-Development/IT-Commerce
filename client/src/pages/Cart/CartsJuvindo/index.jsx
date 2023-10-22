import React from "react";
import { Link } from "react-router-dom";
import Juvindo from "../../../assets/JUVINDO.png";
import styled from "styled-components";
import "./juvCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  useRemoveItemFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} from "../../../features/cart/apiCarts";

function CartsJuvindo({ cartsJuvindo }) {
  const isCheckoutDisabled = cartsJuvindo.some(
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

  //juvindo
  const calculateSubtotalJuvindo = () => {
    return cartsJuvindo.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  // const calculateTotalJuvindo = () => {
  //   const subtotal = calculateSubtotalJuvindo();
  //   const ppn = subtotal * 0.11;
  //   const total = subtotal + ppn;
  //   return total.toFixed(2);
  // };
  // const calculatePPNJuvindo = () => {
  //   const subtotal = calculateSubtotalJuvindo();
  //   const ppn = subtotal * 0.11;
  //   return ppn.toFixed(2);
  // };

 
  function formatPrice(price) {
    const priceString = price.toString();
    const parts = priceString.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const decimalPart = parts[1] ? `.${parts[1]}` : ''; // Check if there's a decimal part

    return `Rp. ${integerPart}${decimalPart}`;
}

  return (
    <div
      className="cart-containers"
      style={{ position: "relative", top: "50px" }}
    >
      <StoreHeader>
        <img
          style={{ maxWidth: "16%" }}
          src={Juvindo}
          alt="Store Logo"
          className="logoJuvindo"
        />
        {/* <StoreTitle>ITech</StoreTitle> */}
      </StoreHeader>
      <div className="contain">
        <div className="titles">
          <H3 className="product-title">Produk</H3>
          <H3 className="price">Harga</H3>
          <H3 className="quantity">Kuantitas</H3>
          <H3 className="total">Total Harga</H3>
        </div>
        <div class="cart-items">
          {cartsJuvindo?.map((e) => (
            <div class="cart-item">
              <div class="cart-product">
                <ProductImageContainer>
                  <Link to={`/products/${e.product.id}`}>
                    <ProductImage src={e.product.image} alt={e.product.name} />
                  </Link>
                </ProductImageContainer>
                <SectionLeft>
                  <Title>
                    {e.product.name.split(" ").slice(0, 14).join(" ")}
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
              <div className="cart-product-price">{formatPrice(e.product.unitPrice)}</div>
              <div className="cart-product-quantity">
                <button onClick={() => handlerDec(e.id)}>-</button>
                <div className="count">{e.quantity}</div>
                <button onClick={() => handlerInc(e.id)}>+</button>
              </div>
              <div className="cart-product-total-price">
                {formatPrice(e.quantity * e.product.unitPrice)}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <p></p>
          <div className="cart-checkout">
            <div className="subtotal">
              <span className="subtot"  style={{ paddingBottom: "10px" }}>Total :</span>
              <span className="amount">
                {formatPrice(calculateSubtotalJuvindo())}
              </span>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontStyle: "italic",
                padding: "8px 0",
              }}
              className="ppn"
            >
              <span>PPN 11% :</span>
              <span className="amount">
                {" "}
                {formatPrice(calculatePPNJuvindo())}
              </span>
            </div> */}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontStyle: "italic",
                padding: "8px 0",
              }}
            >
              <span>Weight :</span>
              <span className="amount">{calculateTotalWeight()} grams</span>
            </div> */}
            {/* <div className="subtotal" style={{ paddingBottom: "10px" }}>
              <span className="subtot">Total : </span>
              <span style={{ fontWeight: "700" }} className="amount">
                {formatPrice(calculateTotalJuvindo())}
              </span>
            </div> */}
            <button className="checkoutButtonStyle" disabled={isCheckoutDisabled}>
              <Link to="/check-TransJuvindo" style={linkStyle}>
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

export default CartsJuvindo;

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
    // margin-right: 30px;
  }
`;
// const checkoutButtonStyle = {
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
