import React, { useEffect, useState } from "react";
import TableComponent from "../tableOrderList";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const DashboardButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MainContentContainer = styled.main`
  display: flex;
  margin: auto;
  flex-direction: column;
  max-width: 1420px;
`;

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

  return (
    <MainContentContainer>
      <h2>Order List</h2>
      <p>Welcome to the Order List!</p>
      <Link to="/">
        <DashboardButton>Dashboard</DashboardButton>
      </Link>
      <TableComponent data={checkoutData} />
    </MainContentContainer>
  );
};

export default MainContent;
