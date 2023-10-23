import React from "react";
import TableComponent from "../table";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      <h2>Main Content</h2>
      <p>Welcome to the dashboard!</p>
      <Link to="/add-product">
        <button>Add</button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;
