import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTotals } from "../../features/cartSlice";
import IndoRiau from "../../assets/Indoriau.png";
import Juvindo from "../../assets/JUVINDO.png";
import styled from "styled-components";
import Itech from "../../assets/Itech.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaShoppingCart } from "react-icons/fa"; // Menggunakan react-icons/fa5 untuk ikon dari Font Awesome 5
const API_URL = "http://localhost:3100"; // Define your API URL here

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [cartsJuvindo, setCartsJuvindo] = useState([]);
  const [cartsItech, setCartsItech] = useState([]);
  const [cartsIndoRiau, setCartsIndoRiau] = useState([]);
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
            "http://localhost:3100/product-carts/",
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

  useEffect(() => {
    const fetchCartsJuvindo = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3100/product-carts/juvindo",
            { headers: { access_token: accessToken } }
          );
          setCartsJuvindo(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCartsJuvindo();
  }, []);

  useEffect(() => {
    const fetchCartsItech = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3100/product-carts/itech",
            { headers: { access_token: accessToken } }
          );
          setCartsItech(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCartsItech();
  }, []);

  useEffect(() => {
    const fetchCartsIndoRiau = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3100/product-carts/indo-riau",
            { headers: { access_token: accessToken } }
          );
          setCartsIndoRiau(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCartsIndoRiau();
  }, []);


  const handlerInc = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "http://localhost:3100/product-carts/increment/" + id;
      axios({ url, method: "patch", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("incrementttt");
        });
    }
  };

  const handlerDec = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "http://localhost:3100/product-carts/decrement/" + id;
      axios({ url, method: "patch", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, "ASdasdas");
        })
        .catch((error) => {
          console.log("asdasd");
        });
    }
  };

  const handlerRemove = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "http://localhost:3100/product-carts/remove/" + id;
      axios({ url, method: "delete", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, "remooove");
        })
        .catch((error) => {
          console.log("asdasd remove");
        });
    }
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

  //juvindo
  const calculateSubtotalJuvindo = () => {
    return cartsJuvindo.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  const calculateTotalJuvindo = () => {
    const subtotal = calculateSubtotalJuvindo();
    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;
    return total.toFixed(2);
  };
  const calculatePPNJuvindo = () => {
    const subtotal = calculateSubtotalJuvindo();
    const ppn = subtotal * 0.11;
    return ppn.toFixed(2);
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

  //IndoRiau
  const calculateSubtotalIndoRiau = () => {
    return cartsIndoRiau.reduce((total, cartItem) => {
      const productPrice = cartItem.product.unitPrice;
      const quantity = cartItem.quantity;
      return total + productPrice * quantity;
    }, 0);
  };
  const calculateTotalIndoRiau = () => {
    const subtotal = calculateSubtotalIndoRiau();
    const ppn = subtotal * 0.11;
    const total = subtotal + ppn;
    return total.toFixed(2);
  };
  const calculatePPNIndoRiau = () => {
    const subtotal = calculateSubtotalIndoRiau();
    const ppn = subtotal * 0.11;
    return ppn.toFixed(2);
  };

  return (
    <>
      {cartsJuvindo.length === 0 &&
      cartsItech.length === 0 &&
      cartsIndoRiau.length === 0 ? (
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
        // ... Kode yang ada jika ada item dalam keranjang belanja
        <>
          {cartsIndoRiau.length > 0 && (
            <div
              className="cart-container"
              style={{ position: "relative", top: "50px" }}
            >
              <StoreHeader>
                <StoreImage
                  style={{ maxWidth: "16%" }}
                  src={IndoRiau}
                  alt="Store Logo"
                />
                {/* <StoreTitle>ITech</StoreTitle> */}
              </StoreHeader>
              <div>
                <div className="titles">
                  <h3 className="product-title">Product</h3>
                  <h3 className="price">Price</h3>
                  <h3 className="quantity">Quantity</h3>
                  <h3 className="total">Total</h3>
                </div>
                <div class="cart-items">
                  {cartsIndoRiau?.map((e) => (
                    <div class="cart-item">
                      <div class="cart-product">
                        <Link to={`/products/${e.product.id}`}>
                          <img
                            src={`${API_URL}/${e.product.image}`}
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
                        {/* <div className="count">{e.quantity}</div> */}
                        <button onClick={() => handlerDec(e.id)}>
                          -
                        </button>
                        {/* <div className="count">{e.quantity}</div> */}
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
                  <button className="clear-cart" onClick={handleClear}>
                    Clear Cart
                  </button>
                  <div className="cart-checkout">
                    <div className="subtotal">
                      <span>Subtotal :</span>
                      <span className="amount">
                        Rp.{calculateSubtotalIndoRiau()}
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
                      <span className="amount">
                        {" "}
                        Rp. {calculatePPNIndoRiau()}
                      </span>
                    </div>
                    <div className="subtotal" style={{ paddingBottom: "10px" }}>
                      <span>Total :</span>
                      <span style={{ fontWeight: "700" }} className="amount">
                        {calculateTotalIndoRiau()}
                      </span>
                    </div>
                    <button style={checkoutButtonStyle}>
                      <Link to="/check-TransIR" style={linkStyle}>
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
            </div>
          )}
          {cartsJuvindo.length > 0 && (
            <div
              className="cart-container"
              style={{ position: "relative", top: "50px" }}
            >
              <StoreHeader>
                <StoreImage
                  style={{ maxWidth: "16%" }}
                  src={Juvindo}
                  alt="Store Logo"
                />
                {/* <StoreTitle>ITech</StoreTitle> */}
              </StoreHeader>
              <div>
                <div className="titles">
                  <h3 className="product-title">Product</h3>
                  <h3 className="price">Price</h3>
                  <h3 className="quantity">Quantity</h3>
                  <h3 className="total">Total</h3>
                </div>
                <div class="cart-items">
                  {cartsJuvindo?.map((e) => (
                    <div class="cart-item">
                      <div class="cart-product">
                        <Link to={`/products/${e.product.id}`}>
                          <img
                            src={`${API_URL}/${e.product.image}`}
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
                        <button onClick={() => handlerDec(e.id)}>-</button>
                        <div className="count">{e.quantity}</div>
                        <button onClick={() => handlerInc(e.id)}>+</button>
                      </div>
                      <div className="cart-product-total-price">
                        Rp.{e.quantity * e.product.unitPrice}
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
                      <span className="amount">
                        Rp.{calculateSubtotalJuvindo()}
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
                      <span className="amount">
                        {" "}
                        Rp. {calculatePPNJuvindo()}
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
                      {/* <span>Weight :</span>
                            <span className="amount">{calculateTotalWeight()} grams</span> */}
                    </div>
                    <div className="subtotal" style={{ paddingBottom: "10px" }}>
                      <span>Total :</span>
                      <span style={{ fontWeight: "700" }} className="amount">
                        {calculateTotalJuvindo()}
                      </span>
                    </div>
                    <button style={checkoutButtonStyle}>
                      <Link to="/check-TransJuvindo" style={linkStyle}>
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
            </div>
          )}
          {cartsItech.length > 0 && (
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
                  <h3 className="product-title">Product</h3>
                  <h3 className="price">Price</h3>
                  <h3 className="quantity">Quantity</h3>
                  <h3 className="total">Total</h3>
                </div>
                <div class="cart-items">
                  {cartsItech?.map((e) => (
                    <div class="cart-item">
                      <div class="cart-product">
                        <Link to={`/products/${e.product.id}`}>
                          <img
                            src={`${API_URL}/${e.product.image}`}
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
                  <button className="clear-cart" onClick={handleClear}>
                    Clear Cart
                  </button>
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
                      <Link to="/productlist">Continue Shopping</Link>
                    </ContinueShoppingButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

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
  text-transform: uppercase;

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
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const ContinueShoppingIcon = styled(FaShoppingCart)`
  margin-right: 8px;
  font-size: 18px;
`;

export default Cart;
