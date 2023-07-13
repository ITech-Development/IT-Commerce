import React, { useContext, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

import Logo from "../../assets/Logo.png";
import ShopIcon from "../../assets/shopIcon.png";
import PhotoProfileIcon from "../../assets/user.png";

import { useSelector } from "react-redux";
import { UserContext } from "../../App.jsx";

export default function Navigation() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const { state, dispatch } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setDropdownOpen(false);
    // Tambahkan tindakan lain yang ingin Anda lakukan saat logout
  };

  const RenderMenu = () => {
    const token = localStorage.getItem("access_token");
    const showCart = token ? true : false; // Menentukan apakah keranjang harus ditampilkan

    return (
      <>
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
        {showCart && ( // Menampilkan keranjang jika showCart adalah true
          <li>
            <Link to="/cart">
              <img
                style={{ height: "50px", color: "blue", cursor: "pointer" }}
                src={ShopIcon}
                alt=""
              />
              <span
                style={{
                  position: "relative",
                  backgroundColor: "yellow",
                  border: "1px solid yellow",
                  borderRadius: "50px",
                  padding: "3px 10px",
                  textDecoration: "none",
                  top: "-30px",
                  right: "26px",
                }}
              >
                {cartTotalQuantity}
              </span>
            </Link>
          </li>
        )}
        {token ? (
          <li>
            <div className="dropdown">
              <img
                onClick={toggleDropdown}
                style={{ height: "50px", color: "blue", cursor: "pointer" }}
                src={PhotoProfileIcon}
                alt=""
              />
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/photo-profile">Profile</Link>
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
          <ul>
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
}
