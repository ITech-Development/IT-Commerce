import React from "react";
import CardComponent from "../../cardDasboard";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main>
      <h2>Dashboard</h2>
      <p>Welcome to the Indo Teknik, Dashboard!</p>
      <CardComponent />
    </main>
  );
};

export default MainContent;
