import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Navigation() {
  const [notificationList, setNotificationList] = useState([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3100/admin-sellers/order-list', {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });
        const notifications = response.data.filter(
          (checkout) => checkout.checkout.deliveryStatus === 'Sedang dikemas' && checkout.checkout.paymentStatus === 'dibayar'
        );
        setNotificationList(notifications);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const RenderNotifications = () => {
    const hasNotifications = notificationList.length > 0;
    return (
      <div className="notifications-dropdown">
        <button
          className={`notifications-btn ${hasNotifications ? 'has-notifications' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Notification
          {hasNotifications && <span className="notification-indicator"></span>}
        </button>
        {(isHovered || isNotificationDropdownOpen) && (
          <ul
            className="notifications-list"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="notifications-head">
              <b>{notificationList.length > 0 ? `${notificationList.length} orderan belum dikirim` : 'Belum ada orderan masuk'}</b>
            </div>
            <hr />
            {notificationList.map((notification) => (
              <li key={notification.checkout.id}>
                {/* Render each notification item as needed */}
                <Link to={`/order-list/${notification.checkout.id}`}>
                  {notification.checkout.id} - {notification.checkout.deliveryStatus}
                  <br />
                  {notification.checkout.midtransCode}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

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
    const accessToken = localStorage.getItem('access_token');
  
    return (
      <>
        {accessToken && (
          <div className="menu-items">
            {/* Render notifications */}
            <li>
              <RenderNotifications />
            </li>
  
            {/* Logout button */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="navigation" >
        <Link to="/">
          <img style={{ height: "50px" }} src={Logo} alt="" />
        </Link>
        <div className="navigation-menu">
          
          <ul >
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
