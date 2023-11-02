import React from "react";
import { Link } from "react-router-dom";
import Carts from "./Checkout";

import { useGetCartsQuery } from "../../features/cart/apiCarts";

const Cart = () => {
  const { data: carts } = useGetCartsQuery();

  return (
    <>
      {carts?.length === 0 ? (
        <div className="cart-container" style={{ position: "relative", top: "50px" }}>
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <div className="start-shopping">
              <Link to="/productlist">
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Carts carts={carts} />
      )}
    </>
  );
};

export default Cart;