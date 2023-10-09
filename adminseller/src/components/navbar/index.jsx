import React, { useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
// import styled from "styled-components";

// const LogoutButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 10px 20px;
//   cursor: pointer;
//   font-size: 16px;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/"; // Redirect to the logout page
  };

  const RenderMenu = () => {
    const accessToken = localStorage.getItem("access_token");
    return (
      <>
        {accessToken && (
          <li>
            <button>Pesan</button>
          </li>
        )}
        {accessToken && (
          <li>
            <button onClick={handleLogout}>Logout</button>
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
