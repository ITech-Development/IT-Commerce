import React from "react";
import { Link } from "react-router-dom";
import CartsIndoRiau from "./CartsIndoRiau";
import CartsJuvindo from "./CartsJuvindo";
import CartsItech from "./CartsItech";
import CartsIndoTeknik from "./CartsIndoTeknik"; // Import the new component

import {
  useGetCartsIndoRiauQuery,
  useGetCartsJuvindoQuery,
  useGetCartsItechQuery,
  useGetCartsIndoTeknikQuery, // Add the query for "cartsIndoTeknik"
} from "../../features/cart/apiCarts";

const Cart = () => {
  const { data: cartsIndoRiau } = useGetCartsIndoRiauQuery();
  const { data: cartsJuvindo } = useGetCartsJuvindoQuery();
  const { data: cartsItech } = useGetCartsItechQuery();
  const { data: cartsIndoTeknik } = useGetCartsIndoTeknikQuery(); // Fetch "cartsIndoTeknik" data
  console.log(cartsIndoTeknik, 'iteknik');

  return (
    <>
      {cartsJuvindo?.length === 0 &&
        cartsItech?.length === 0 &&
        cartsIndoRiau?.length === 0 &&
        cartsIndoTeknik?.length === 0 ? ( // Check if all cart arrays are empty
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
        <>
          {cartsIndoRiau?.length > 0 && <CartsIndoRiau cartsIndoRiau={cartsIndoRiau} />}
          {cartsJuvindo?.length > 0 && <CartsJuvindo cartsJuvindo={cartsJuvindo} />}
          {cartsItech?.length > 0 && <CartsItech cartsItech={cartsItech} />}
          {cartsIndoTeknik?.length > 0 && <CartsIndoTeknik cartsIndoTeknik={cartsIndoTeknik} />} {/* Render "CartsIndoTeknik" if there are items */}
        </>
      )}
    </>
  );
};

export default Cart;