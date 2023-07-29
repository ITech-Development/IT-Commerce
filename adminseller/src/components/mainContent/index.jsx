import React from "react";
import TableComponent from "../table";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      <h2>Main Content</h2>
      <p>Welcome to the dashboard!</p>
      <Link
        to="/add-product"
        style={{ padding: "10px", display: "flex", justifyContent: "end" }}
      >
        <button
          style={{
            padding: "10px 20px",
            flex: 1,
            maxWidth: "100px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add
        </button>
      </Link>
      <TableComponent />
    </main>
  );
};

export default MainContent;
