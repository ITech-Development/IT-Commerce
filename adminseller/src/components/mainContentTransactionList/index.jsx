import React, { useEffect, useState } from "react";
import TableComponent from "../tableTransactionList";
import { Link } from "react-router-dom";
import axios from "axios";

const MainContent = () => {
  const [TransactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Replace the URL with your API endpoint
    axios
      .get(
        "https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/transaction-list",
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        // Set data transaction received from the API to the state
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // [] as a dependency to run the effect only once when the component is mounted

  const totalTransactions = TransactionData.length;
  return (
    <main style={mainStyles}>
      <h2>History Transaksi Pembayaran</h2>
      <p>Total Transaksi : {totalTransactions}</p>
      <Link to="/" style={buttonStyles}>
        Dashboard
      </Link>
      <TableComponent data={TransactionData} />
    </main>
  );
};

const mainStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  paddingTop: "80px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  // backgroundColor: "#f7f7f7",
  width: 'auto'
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
