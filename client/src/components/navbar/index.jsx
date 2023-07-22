import React, { useState, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/Logo.png";
// import ShopIcon from "../../assets/shopIcon.png";
// import PhotoProfileIcon from "../../assets/user.png";
import ProfileIcon from "../../assets/icon.svg";


import { useSelector } from "react-redux";

export default function Navigation() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/productlist">Products</Link>
          </li>
          <li>
            <Link to="/service">Services</Link>
          </li>
        </div>
        {showCart && (
          <li>
            <Link to="/cart">
              {/* Use the Font Awesome icon component */}
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              <span className="cart-quantity">
                {cartTotalQuantity}
              </span>
            </Link>
          </li>
        )}
        {token ? (
          <li>
            <div className="dropdown" ref={dropdownRef}>
              <img
                onClick={toggleDropdown}
                style={{ height: "50px", color: "blue", cursor: "pointer" }}
                src={ProfileIcon}
                alt=""
              />
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile-update">Profile</Link>
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
