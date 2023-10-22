import React from "react";
import { Link } from "react-router-dom";
import IndoRiau from "../../../assets/Indoriau.png";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FaShoppingCart } from "react-icons/fa"; // Menggunakan react-icons/fa5 untuk ikon dari Font Awesome 5
import {
  useRemoveItemFromCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} from "../../../features/cart/apiCarts";
import "./irCart.css";

function CartsIndoRiau({ cartsIndoRiau }) {
  const isCheckoutDisabled = cartsIndoRiau.some(
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

  //IndoRiau
  const calculateSubtotalIndoRiau = () => {
    return cartsIndoRiau.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  // const calculateTotalIndoRiau = () => {
  //   const subtotal = calculateSubtotalIndoRiau();
  //   // const ppn = subtotal * 0.11;
  //   const total = subtotal;
  //   return total.toFixed(0);
  // };
  // const calculatePPNIndoRiau = () => {
  //   const subtotal = calculateSubtotalIndoRiau();
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
          src={IndoRiau}
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
          {cartsIndoRiau?.map((e) => (
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
              <span className="amount">{formatPrice(calculateSubtotalIndoRiau())}</span>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontStyle: "italic",
                padding: "8px 0",
              }}
            >
              <span>PPN 11% :</span>
              <span className="amount"> {formatPrice(calculatePPNIndoRiau())}</span>
            </div> */}
            {/* <div className="subtotal" style={{ paddingBottom: "10px" }}>
              <span className="subtot">Total :</span>
              <span style={{ fontWeight: "700" }} className="amount">
              {formatPrice(calculateTotalIndoRiau())}
              </span>
            </div> */}
            <button
              className="checkoutButtonStyle"
              disabled={isCheckoutDisabled} // Disable the button if any product is out of stock
            >
              <Link to="/check-TransIR" style={linkStyle}>
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

export default CartsIndoRiau;

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
