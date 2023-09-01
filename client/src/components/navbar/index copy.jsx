import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logoss.png";
import ShopIcon from "../../assets/shopIcon.png";
import ProfileImage from "../../assets/user.png"; // Import foto profil

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../../features/authslice";
import { toast } from "react-toastify";

export default function Navigation() {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // Define state for the dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <nav className="navigation">
        <Link to="/">
          <img style={{ height: "50px" }} src={Logo} alt="" />
        </Link>
        <div className="navigation-menu">
          <ul>
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
          </ul>
        </div>
        <div>
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
        </div>
        <div className="profile-dropdown">
          <div className="profile-image" onClick={toggleDropdown}>
            <img
              style={{ height: "50px", borderRadius: "50%" }}
              src={ProfileImage}
              alt="Profile"
            />
          </div>
          {dropdownOpen && (
            <DropdownMenu>
              <ul>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Logout
                    onClick={() => {
                      dispatch(logoutUser(null));
                      toast.warning("Logged out!", { position: "bottom-left" });
                    }}
                  >
                    Logout
                  </Logout>
                </li>
              </ul>
            </DropdownMenu>
          )}
        </div>
        {auth && auth._id ? (
          <Logout
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("Logged out!", { position: "bottom-left" });
            }}
          >
            Logout
          </Logout>
        ) : (
          <AuthLinks>
            <button
              className="btn"
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#243A73",
                color: "white",
                border: "1px solid #243A73",
                borderRadius: "10px",
              }}
            >
              <Link to="/login">Masuk</Link>
            </button>
            <button
              className="btn"
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#243A73",
                color: "white",
                border: "1px solid #243A73",
                borderRadius: "10px",
              }}
            >
              <Link to="/logout">Keluar</Link>
            </button>
          </AuthLinks>
        )}
      </nav>
    </>
  );
}

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Logout = styled.div`
  color: white;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px;
      &:hover {
        background-color: #f5f5f5;
      }
      a {
        color: #333;
        text-decoration: none;
      }
    }
  }
`;
