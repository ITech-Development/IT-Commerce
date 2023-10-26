import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logoss.png";
import CartIcon from "./iconCart.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { useGetCountCartsQuery } from "../../features/cart/apiCarts";
import { useGetMeQuery } from "../../features/user/apiUser";
import { Sidebar } from "../sidebar/index.";

export default function Toolbar(props) {
  const { data: totalCart } = useGetCountCartsQuery();
  const { data: me } = useGetMeQuery();

  useEffect(() => {
    console.log(totalCart, "test total cart");
  }, [totalCart]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const dropdownRef = useRef(null);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsDropdownOpen(false);
  };

  const token = localStorage.getItem("access_token");
  const showCart = token ? true : false;
  const RenderMenu = () => {
    return (
      <>
        <li style={{ display: "flex", alignItems: "center" }}>
          <Link to="/productlist">Semua Produk</Link>
        </li>
        <li style={{ display: "flex", alignItems: "center" }}>
          <Link to="/aboutUs">Tentang Kami</Link>
        </li>

        {showCart && (
          <li>
            <Link to="/cart">
              {/* <FontAwesomeIcon icon='' className="cart-icon" /> */}
              <img style={{ paddingTop: "6px" }} src={CartIcon} alt="" />
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
                {totalCart === 0 ? "0" : totalCart}
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
                Halo, <strong>{me?.fullName}</strong>{" "}
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
                      to="/login"
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
        <div className="logo-indo-teknik">
          <Link to="/">
            <img className="logosss" style={{}} src={Logo} alt="" />
          </Link>
        </div>
        <div className="navigation-menu">
          <ul className={isDropdownOpen ? "expanded" : ""}>
            <RenderMenu />
          </ul>
          <div className="cart-mobile">
            {showCart && (
              <Link to="/cart">
                <img className="cartIcons" src={CartIcon} alt="" />
                <span
                  style={{
                    position: "relative",
                    border: "1px solid #2EEDF5",
                    borderRadius: "50px",
                    padding: "3px 6.3px",
                    fontWeight: "700",
                    textDecoration: "none",
                    color: "black",
                    top: "-30px",
                    right: "8px",
                    fontSize: "7px",
                  }}
                >
                  {totalCart === 0 ? "0" : totalCart}
                </span>
              </Link>
            )}
          </div>
          {token ? (
            <div className="profile-mobile">
              <Link to="/profile-update">
                <img
                  style={{
                    height: "32px",
                    color: "blue",
                    cursor: "pointer",
                    paddingLeft: "5px",
                  }}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt=""
                />
              </Link>
            </div>
          ) : (
            <div className="login-mobile">
              <Link to="/login">
                <button className="login-button">Masuk</button>
              </Link>
            </div>
          )}

          <button className="hamburger" onClick={handleSidebarToggle}>
            <i
              className="fas fa-bars"
              style={{ fontSize: "10px", paddingLeft: "10px" }}
            ></i>
          </button>
        </div>
        {isSidebarOpen && <Sidebar closeSidebar={handleSidebarToggle} />}
      </nav>
    </>
  );
}
