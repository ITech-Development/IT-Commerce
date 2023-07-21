import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTotals } from "../../features/cartSlice";

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

  const handlerInc = (id) => {
    handleCartAction("increment", id);
  };

  const handlerDec = (id) => {
    handleCartAction("decrement", id);
  };

  const handlerRemove = (id) => {
    handleCartAction("remove", id);
  };

  const handlerClear = () => {
    handleCartAction("clear");
  };

  const handleCartAction = (action, id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = `http://localhost:3100/product-carts/${action}/${id}`;
      axios
        .patch(url, null, { headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(`${action} error`, error);
        });
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
      <div className="cart-container" style={{position: 'relative', top: '80px'}}>
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
                    <img src={cartItem.product.image} alt={cartItem.product.image} />
                    <div>
                      <h3>{cartItem.product.name}</h3>
                      <p>{cartItem.product.description}</p>
                      <button onClick={() => handlerRemove(cartItem.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">Rp.{cartItem.product.unitPrice}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handlerDec(cartItem.id)}>-</button>
                    <div className="count">{cartItem.quantity}</div>
                    <button onClick={() => handlerInc(cartItem.id)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    Rp.{cartItem.quantity * cartItem.product.unitPrice}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-cart" onClick={handlerClear}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">Rp.{calculateSubtotal()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>PPN 11% :</span>
                  <span className="amount"> Rp. {calculatePPN()}</span>
                </div>
                <div className="subtotal">
                  <span>Total</span>
                  <span className="amount">{calculateTotal()}</span>
                </div>
                <button>
                  <Link to="/shipping">Check Out</Link>
                </button>
                <div className="start-shopping">
                  <Link to="/productlist">
                    <span>&lt;</span>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
