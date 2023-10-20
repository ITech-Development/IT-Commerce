import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../navbar/iconCart.png";


export function Sidebar({ closeSidebar, totalCart }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsDropdownOpen(false);
        // Add any other actions you want to perform on logout
    };

    const token = localStorage.getItem("access_token");
    const showCart = token ? true : false;

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/productlist">Produk</Link>
                </li>
                <li>
                    <Link to="/services">Layanan</Link>
                </li>
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
                                {totalCart === 0 ? '0' : totalCart}
                            </span>
                        </Link>
                    </li>
                )}
                <hr />
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
                        to='/login'
                    >
                        Keluar
                    </Link>
                </li>
                {/* Add more sidebar items as needed */}
            </ul>
            <button className="close-sidebar" onClick={closeSidebar}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}
