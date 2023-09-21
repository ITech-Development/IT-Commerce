import React, { useEffect, useState } from "react";
import TableComponent from "../tableUser";
import { Link } from "react-router-dom";
import axios from 'axios';

const MainContent = () => {

  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    // Ganti URL dengan URL endpoint API Anda
    axios.get('https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/order-list')
      .then((response) => {
        // Set data checkout yang diterima dari API ke state
        setCheckoutData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // [] sebagai dependensi untuk menjalankan efek hanya sekali saat komponen dipasang

  return (
    <main style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
      <h2>Order List</h2>
      
      <p>Welcome to the Order List!</p>

      <Link to="/">
        <button>Dashboard</button>
      </Link>
      <TableComponent data={checkoutData}/>
    </main>
  );
};

export default MainContent;
