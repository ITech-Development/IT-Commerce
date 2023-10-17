import React from "react";
import { Link } from "react-router-dom";
import CartsIndoRiau from "./CartsIndoRiau";
import CartsJuvindo from "./CartsJuvindo";
import CartsItech from "./CartsItech";

import {
  useGetCartsIndoRiauQuery,
  useGetCartsJuvindoQuery,
  useGetCartsItechQuery
} from "../../features/cart/apiCarts";

const Cart = () => {

  const { data: cartsIndoRiau } = useGetCartsIndoRiauQuery()
  const { data: cartsJuvindo } = useGetCartsJuvindoQuery()
  const { data: cartsItech } = useGetCartsItechQuery()
  
  return (
    <>
      {cartsJuvindo?.length === 0 &&
        cartsItech?.length === 0 &&
        cartsIndoRiau?.length === 0 ? (
        <div
          className="cart-container"
          style={{ position: "relative", top: "50px" }}
        >
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
        <>
          {cartsIndoRiau?.length > 0 && (
            <CartsIndoRiau cartsIndoRiau={cartsIndoRiau} />
          )}
          {cartsJuvindo?.length > 0 && (
            <CartsJuvindo cartsJuvindo={cartsJuvindo} />
          )}
          {cartsItech?.length > 0 && (
            <CartsItech cartsItech={cartsItech} />
          )}
        </>
      )}
    </>
  );
};

export default Cart;
