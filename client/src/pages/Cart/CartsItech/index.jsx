import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Itech from "../../../assets/Itech.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaShoppingCart } from "react-icons/fa"; // Menggunakan react-icons/fa5 untuk ikon dari Font Awesome 5

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
    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;
    return total.toFixed(2);
  };
  const calculatePPNItech = () => {
    const subtotal = calculateSubtotalItech();
    const ppn = subtotal * 0.11;
    return ppn.toFixed(2);
  };

  return (
    <div
      className="cart-container"
      style={{ position: "relative", top: "50px" }}
    >
      <StoreHeader>
        <StoreImage style={{ maxWidth: "16%" }} src={Itech} alt="Store Logo" />
        {/* <StoreTitle>ITech</StoreTitle> */}
      </StoreHeader>

      <div>
        <div className="titles">
          <h3 className="product-title">Produk</h3>
          <h3 className="price">Harga</h3>
          <h3 className="quantity">Kuantitas</h3>
          <h3 className="total">Total Harga</h3>
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
                <button onClick={() => handlerInc(e.id)}>+</button>
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
            <div className="subtotal">
              <span>Subtotal :</span>
              <span className="amount">Rp.{calculateSubtotalItech()}</span>
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
              <span className="amount"> Rp. {calculatePPNItech()}</span>
            </div>
            <div className="subtotal" style={{ paddingBottom: "10px" }}>
              <span>Total :</span>
              <span style={{ fontWeight: "700" }} className="amount">
                {calculateTotalItech()}
              </span>
            </div>
            <button style={checkoutButtonStyle} disabled={isCheckoutDisabled}>
              <Link to="/check-TransITech" style={linkStyle}>
                {!isCheckoutDisabled ? "Checkout" : "Stok produk kosong"}
              </Link>
            </button>
            <ContinueShoppingButton>
              <ContinueShoppingIcon as={FaShoppingCart} />
              <Link to="/productlist">Beli Lagi</Link>
            </ContinueShoppingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductImage = styled.img`
  max-width: 180px;
  max-height: 100px;
`;

const ProductImageContainer = styled.div`
  margin-right: 20px;
`;

const StoreHeader = styled.div`
  max-width: 900px;
  margin-top: 30px;
  // background: #ddefef;
  // padding: 10px 76% 10px 5px;
`;

const StoreImage = styled.img`
  width: 280px;

`;

const SectionLeft = styled.div`
 padding-left: 20px
`;

const Title = styled.div`
  font-size: 17px;
  width: 90%;
  font-weight: 500;
`;

// const Description = styled.div`
//  width: 80%;
//  font-size: 13px;
//  padding: 10px 0;
// `;

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

const ContinueShoppingButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none; /* Set text-decoration to none to remove the underline */

  &:hover {
    background-color: #0056b3;
  }
`;

const ContinueShoppingIcon = styled(FaShoppingCart)`
  margin-right: 8px;
  font-size: 18px;
`;

export default CartsItech;
