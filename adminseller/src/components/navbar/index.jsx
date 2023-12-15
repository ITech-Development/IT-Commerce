import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Navigation() {
  const [packingCount, setPackingCount] = useState(0); // State to store the count of "Dikemas" status

  useEffect(() => {
    // Ganti URL dengan URL endpoint API Anda
    axios.get('http://localhost:3100/admin-sellers/order-list', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        // Set data checkout yang diterima dari API ke state

        // Calculate the count of "Dikemas" statuses
        const dikemasCount = response.data.filter(checkout => checkout.checkout.deliveryStatus === 'Dikemas').length;
        setPackingCount(dikemasCount);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // [] sebagai dependensi untuk menjalankan efek hanya sekali saat komponen dipasang


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
          <div>
            < li >
              <button onClick={handleLogout}>Logout</button>
              <br />
              {packingCount > 0
                ? `Notification: Ada ${packingCount} orderan belum Dikirim'`
                : 'Notification: ' + 'Belum ada orderan masuk'
              }
            </li >

          </div>
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
