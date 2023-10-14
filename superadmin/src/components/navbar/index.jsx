import React, { useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Navigation() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navigation">
        <Link to="/">
          <img style={{ height: "50px" }} src={Logo} alt="" />
        </Link>
        <div className="navigation-menu">
          <button className="hamburger" onClick={toggleDropdown}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="navigation-menu">
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>
      </nav>
    </>
  );
}
