import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/auth/Login";
import Dashboard from "./pages/dashboard";
import GetTransactionList from "./pages/getTransactionList";
import GetOrderList from "./pages/getOrderList";
import EditDeliveryStatus from "./pages/editDeliveryStatus/index";
import DetailsProduct from "./pages/detailsProduct";
import NotFound from "./pages/notFound";
import React, { createContext, useEffect, useReducer, useState } from "react";
import Chat from "./pages/Chat";
import GetProductList from "./pages/getProductList";
import { Provider } from "react-redux";
import store from './app/store'
import { useGetNotificationCountQuery } from "./features/adminSeller/apiAdminSellers";
import notificationSound from "../src/assets/sounds/notification.mp3";

export const UserContext = createContext();

const Routing = () => {
  const { data: notifCount } = useGetNotificationCountQuery()
  const accessToken = localStorage.getItem("access_token");

  // State to manage the visibility of the pop-up
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  // State to track whether the popup should be closed for 5 hours
  const [closeFor5Hours, setCloseFor5Hours] = useState(false);

  useEffect(() => {
    // Show the pop-up when notifCount is greater than 0 and not closed for 5 hours
    if (notifCount && notifCount > 0 && !closeFor5Hours) {
      setIsPopUpVisible(true);
    }

    // Set up an interval to check every 5 minutes
    const intervalId = setInterval(() => {
      setIsPopUpVisible(notifCount && notifCount > 0 && !closeFor5Hours);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [notifCount, closeFor5Hours]);

  const closePopUp = () => {
    // Close the pop-up when needed
    setIsPopUpVisible(false);
  };

  const disableNotificationsHandler = () => {
    // Set the state to indicate that the popup should be closed for 5 hours
    setCloseFor5Hours(true);

    // Close the popup
    closePopUp();

    // Reset the state after 5 hours
    setTimeout(() => {
      setCloseFor5Hours(false);
    }, 5 * 60 * 60 * 1000); // 5 hours in milliseconds
  };

  return (
    <>
      <Routes>
        {!accessToken ? (
          <>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-list" element={<GetProductList />} />
            <Route path="/product-list/:id" element={<DetailsProduct />} />
            <Route path="/transaction-list" element={<GetTransactionList />} />
            <Route path="/order-list" element={<GetOrderList />} />
            <Route path="/order-list/:id" element={<EditDeliveryStatus />} />
            <Route path="/products/:id" element={<DetailsProduct />} />
            <Route path="/chat" element={<Chat />} />
          </>
        )}
      </Routes>
      {isPopUpVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Content of the pop-up */}
            <p>Halo <b>Admin Seller,</b></p>
            <audio autoPlay>
              <source src={notificationSound} type="audio/mp3" />
            </audio>
            <p>Customer sedang menunggu pesanan datang. Mohon segera packing orderan ya!</p>
            <button onClick={closePopUp}>Tutup</button>
            <button onClick={disableNotificationsHandler}>Matikan</button>
          </div>
        </div>
      )}
    </>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routing />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
