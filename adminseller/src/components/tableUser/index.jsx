import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:3100"; // Define your API URL here

const TableComponent = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/voucher`, {
        headers: {
          // Include any necessary headers here
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        // Flatten the data into an array of orders
        const flattenedOrders = Object.values(data).flatMap(userOrders => userOrders);
        setOrders(flattenedOrders);
        setFilteredOrders(flattenedOrders);
      })
      .catch((error) => {
        console.error(error.response?.data ?? "There was an error.");
      });
  }, []);

  const handleFilter = (filterText) => {
    if (!filterText) {
      setFilteredOrders(orders);
    } else {
      const filteredData = orders.filter((order) =>
        JSON.stringify(order).toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredOrders(filteredData);
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "auto",
        maxWidth: "1400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "10px", display: "flex", justifyContent: "end" }}>
        <input
          style={{ padding: "10px 20px", flex: 1, maxWidth: "500px" }}
          type="text"
          placeholder="Search by order details"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Shipping Address</TableCell>
            <TableCell>Voucher Code</TableCell>
            <TableCell>Midtrans Code</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.shippingAddress}</TableCell>
              <TableCell>{order.voucherCode}</TableCell>
              <TableCell>{order.midtransCode}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
