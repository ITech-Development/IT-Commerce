import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logoss.png";
import CartIcon from "./iconCart.png";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Navigation() {
  const [carts, setCarts] = useState([]);
  const [profile, setProfile] = useState([]);

  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url =
        "https://indoteknikserver-732012365989.herokuapp.com/product-carts";
      axios({ url, headers: { access_token: accessToken } })
        .then(async ({ data }) => {
          setCarts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/users/me";
      axios({ url, headers: { access_token: accessToken } })
        .then(async ({ data }) => {
          console.log(data, "dari profile");
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsDropdownOpen(false);
    // Add any other actions you want to perform on logout
  };

  const RenderMenu = () => {
    const token = localStorage.getItem("access_token");
    const showCart = token ? true : false;

    return (
      <>
        <div style={{ display: "flex", alignItems: "center" }}>
        <li>
            <Link to="/articles">Artikel</Link>
          </li>
          <li>
            <Link to="/productlist">Produk</Link>
          </li>
          <li>
            <Link to="/services">Servis</Link>
          </li>
        </div>
        {showCart && (
          <li>
            <Link to="/cart">
              {/* <FontAwesomeIcon icon='' className="cart-icon" /> */}
              <img
                style={{ position: "relative", top: "6px" }}
                src={CartIcon}
                alt=""
              />
              <span
                style={{
                  position: "relative",
                  // backgroundColor: "#2EEDF5",
                  border: "1px solid #2EEDF5",
                  borderRadius: "50px",
                  padding: "4px 7.3px",
                  fontWeight: "700",
                  textDecoration: "none",
                  color: "black",
                  top: "-25px",
                  right: "8px",
                  fontSize: "10px",
                }}
              >
                {totalQuantity}
              </span>
            </Link>
          </li>
        )}
        {token ? (
          <li
            onMouseEnter={() => setIsDropdownHovered(true)}
            onMouseLeave={() => setIsDropdownHovered(false)}
          >
            <div
              className="dropdown"
              ref={dropdownRef}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "16px", paddingRight: "5px" }}>
                Halo, <strong>{profile.fullName}</strong>{" "}
              </p>
              <img
                style={{
                  height: "42px",
                  color: "blue",
                  cursor: "pointer",
                  paddingLeft: "10px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
              />
              {isDropdownHovered && (
                <ul
                  className="dropdown-menu"
                  style={{ flexDirection: "column" }}
                >
                  <li
                    style={{
                      display: "flex",
                      padding: "10px 13px",
                      margin: "0",
                      alignContent: "center",
                      alignItems: "start",
                      color: "gray",
                    }}
                  >
                    <i style={{ marginLeft: "3px" }} className="fas fa-user" />{" "}
                    <Link
                      style={{ display: "flex", marginLeft: "12px" }}
                      to="/profile-update"
                    >
                      Profil
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      padding: "10px 13px",
                      margin: "0",
                      alignContent: "center",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    <i className="fas fa-shopping-cart" />{" "}
                    <Link
                      style={{ display: "flex", marginLeft: "10px" }}
                      to="/my-order"
                    >
                      Pesanan
                    </Link>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      padding: "10px 13px",
                      margin: "0",
                      alignContent: "center",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    <i
                      style={{ marginLeft: "2px" }}
                      className="fas fa-sign-out-alt"
                    />{" "}
                    <Link
                      style={{ display: "flex", marginLeft: "11.2px" }}
                      onClick={handleLogout}
                    >
                      Keluar
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className="login-button">Masuk</button>
            </Link>
          </li>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="navigation">
        <Link to="/">
          <img style={{}} src={Logo} alt="" />
        </Link>
        <div className="navigation-menu">
          <ul className={isDropdownOpen ? "expanded" : ""}>
            <RenderMenu />
          </ul>
          <button className="hamburger" onClick={toggleDropdown}>
            <i className="fas fa-bars" style={{ fontSize: '10px' }}></i>
          </button>
        </div>
      </nav>
    </>
  );
}
