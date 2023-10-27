import React, { useEffect, useState } from "react";
import TableComponent from "../tableOrderList";
import { Link } from "react-router-dom";
import axios from "axios";

const MainContent = () => {
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/order-list",
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        setCheckoutData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalOrders = checkoutData.length;

  return (
    <main style={mainStyles}>
      <h2> History Pesanan</h2>
      <p>Total Transaksi : {totalOrders}</p>
      <Link to="/" style={buttonStyles}>
        Dashboard
      </Link>
      <TableComponent data={checkoutData} />
    </main>
  );
};

const mainStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  paddingTop: '80px',
  borderRadius: "8px",
  // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: '100%'
};

const buttonStyles = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
  margin: "10px 0",
};


export default MainContent;
