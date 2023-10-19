import React from "react";
import { Link } from "react-router-dom";

export function Sidebar({ closeSidebar }) {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/productlist">Produk</Link>
                </li>
                <li>
                    <Link to="/services">Layanan</Link>
                </li>
                {/* Add more sidebar items as needed */}
            </ul>
            <button className="close-sidebar" onClick={closeSidebar}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}
