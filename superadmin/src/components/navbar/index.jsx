import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link, useParams } from "react-router-dom";
import ProfileIcon from "../../assets/icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  // const [carts, setCarts] = useState([]);

  // const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   if (accessToken) {
  //     let url = "http://localhost:3100/product-carts";
  //     axios({ url, headers: { access_token: accessToken } })
  //       .then(async ({ data }) => {
  //         setCarts(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

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

    // return (
    //   <>
    //     <div style={{ display: "flex", alignItems: "center" }}>
    //       <li>
    //         <Link to="/">Dashboard</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About us</Link>
    //       </li>
    //       <li>
    //         <Link to="/productlist">Products</Link>
    //       </li>
    //       <li>
    //         <Link to="/services">Services</Link>
    //       </li>
    //     </div>
    //     {showCart && (
    //       <li>
    //         <Link to="/cart">
    //           <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
    //           <span
    //             style={{
    //               position: "relative",
    //               backgroundColor: "#2EEDF5",
    //               border: "1px solid #2EEDF5",
    //               borderRadius: "50px",
    //               padding: "4px 9px",
    //               textDecoration: "none",
    //               color: "black",
    //               top: "-8px",
    //               right: "8px",
    //               fontSize: "13px",
    //             }}
    //           >
    //           </span>
    //         </Link>
    //       </li>
    //     )}
    //     {token ? (
    //       <li>
    //         <div className="dropdown" ref={dropdownRef}>
    //           <img
    //             onClick={toggleDropdown}
    //             style={{ height: "50px", color: "blue", cursor: "pointer" }}
    //             src={ProfileIcon}
    //             alt=""
    //           />
    //           {isDropdownOpen && (
    //             <ul className="dropdown-menu">
    //               <li>
    //                 <Link to="/profile-update">Profile</Link>
    //                 {/* <Link to={profileLink}>Profile</Link> */}
    //               </li>
    //               <li>
    //                 <Link onClick={handleLogout}>Logout</Link>
    //               </li>
    //             </ul>
    //           )}
    //         </div>
    //       </li>
    //     ) : (
    //       <li>
    //         <Link to="/login">
    //           <button className="login-button">Login</button>
    //         </Link>
    //       </li>
    //     )}
    //   </>
    // );
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
