import React from "react";
import TableComponent from "../tableUser";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main style={{ display: "flex", margin: "auto", flexDirection: "column" }}>
      <h2>List Users</h2>
      
      <p>Welcome to the List Users!</p>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;
