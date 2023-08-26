import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import CartIcon from './iconCart.png'


export default function Navigation() {
  const [carts, setCarts] = useState([]);
  const [profile, setProfile] = useState([]);

  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "http://localhost:3100/product-carts";
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
      let url = "http://localhost:3100/users/me";
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
            <Link to="/productlist">Produk</Link>
          </li>
          <li>
            <Link to="/services">Layanan</Link>
          </li>
        </div>
        {showCart && (
          <li>
            <Link to="/cart">
              {/* <FontAwesomeIcon icon='' className="cart-icon" /> */}
              <img style={{position: 'relative', top: '6px'}} src={CartIcon} alt="" />
              <span
                style={{
                  position: "relative",
                  backgroundColor: "#2EEDF5",
                  border: "1px solid #2EEDF5",
                  borderRadius: "50px",
                  padding: "4px 7.3px",
                  fontWeight: '700',
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
          <li>
            <div
              className="dropdown"
              ref={dropdownRef}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                Halo, <strong>{profile.fullName}</strong>{" "}
              </p>
              <img
                onClick={toggleDropdown}
                style={{
                  height: "50px",
                  color: "blue",
                  cursor: "pointer",
                  paddingLeft: "10px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
              />
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile-update">Profile</Link>
                    {/* <Link to={profileLink}>Profile</Link> */}
                  </li>
                  <li>
                    <Link to="/my-order">My Order</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className="login-button">Login</button>
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
          <img style={{ height: "50px" }} src={Logo} alt="" />
        </Link>
        <div className="navigation-menu">
          <ul className={isDropdownOpen ? "expanded" : ""}>
            <RenderMenu />
          </ul>
          <button className="hamburger" onClick={toggleDropdown}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </>
  );
}
