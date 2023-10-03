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


    const [removeItemFromCart] = useRemoveItemFromCartMutation()
    const [incrementCartItem] = useIncrementCartItemMutation()
    const [decrementCartItem] = useDecrementCartItemMutation()

    const handlerInc = (id) => {
        incrementCartItem(id)
    };

    const handlerDec = (id) => {
        decrementCartItem(id)
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
                <StoreImage
                    style={{ maxWidth: "16%" }}
                    src={Itech}
                    alt="Store Logo"
                />
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
                                <Link to={`/products/${e.product.id}`}>
                                    <img
                                        src={e.product.image}
                                        alt={e.product.name}
                                    />
                                </Link>
                                <div>
                                    <h3>{e.product.name}</h3>
                                    <p>{e.product.description}</p>
                                    <button onClick={() => handlerRemove(e.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Hapus

                                    </button>
                                </div>
                            </div>
                            <div className="cart-product-price">
                                Rp.{e.product.unitPrice}
                            </div>
                            <div className="cart-product-quantity">
                                <button onClick={() => handlerDec(e.id)}>
                                    -
                                </button>
                                <div className="count">{e.quantity}</div>
                                <button onClick={() => handlerInc(e.id)}>
                                    +
                                </button>
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
                        <div className="subtotal">
                            <span>Subtotal :</span>
                            <span className="amount">
                                Rp.{calculateSubtotalItech()}
                            </span>
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
                        <button style={checkoutButtonStyle}>
                            <Link to="/check-TransITech" style={linkStyle}>
                                Check Out
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
    )
}

const StoreHeader = styled.div`
  max-width: 900px;
  // background: #ddefef;
  // padding: 10px 76% 10px 5px;
`;

const StoreImage = styled.img`
  max-width: 230px;
`;

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

const ContinueShoppingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  text-decoration: none; /* Set text-decoration to none to remove the underline */

  &:hover {
    color: #007bff;
  }
`;

const ContinueShoppingIcon = styled(FaShoppingCart)`
  margin-right: 8px;
  font-size: 18px;
`;

export default CartsItech