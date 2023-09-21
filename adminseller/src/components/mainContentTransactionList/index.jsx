import React, { useEffect, useState } from "react";
import TableComponent from "../tableTransactionList";
import { Link } from "react-router-dom";
import axios from 'axios';

const MainContent = () => {

  const [TransactionData, setTransactionData] = useState([]);
  
  useEffect(() => {
    // Ganti URL dengan URL endpoint API Anda
    axios.get('https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/transaction-list', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then((response) => {
        // Set data transaction yang diterima dari API ke state
        setTransactionData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // [] sebagai dependensi untuk menjalankan efek hanya sekali saat komponen dipasang

  return (
    <main style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
      <h2>Transaction List</h2>

      <p>Welcome to the Transaction List!</p>

      <Link to="/">
        <button>Dashboard</button>
      </Link>
      <TableComponent data={TransactionData} />
    </main>
  );
};

export default MainContent;
