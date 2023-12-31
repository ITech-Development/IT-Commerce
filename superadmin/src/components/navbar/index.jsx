import React, { useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Navigation() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    // Implement your logout logic here, for example:
    // Clear user session, tokens, or any other data related to authentication
    // Redirect user to the logout page or the login page
    // Example:
    // localStorage.clear(); // Clear all data from local storage
    window.location.href = "/"; // Redirect to the logout page
  };

  const RenderMenu = () => {
    const accessToken = localStorage.getItem('access_token')
    // Implement your menu items here, for example:
    return (
      <>
        {accessToken && (
          < li >
            <button onClick={handleLogout}>Logout</button>
          </li >
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
          <button className="hamburger" onClick={toggleDropdown}>
            <i className="fas fa-bars"></i>
          </button>
          {localStorage.getItem('access_token') && (
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
          )}
  
          <ul className={isDropdownOpen ? "expanded" : ""}>
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
}
