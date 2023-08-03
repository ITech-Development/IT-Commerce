// MainContent.js
import React, { useState } from 'react';
// import TableComponent from '../table';
import CardComponent from '../cardDasboard'
import { Link } from 'react-router-dom'

const MainContent = () => {
  // const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>

        <h2>Dashboard</h2>
        <p>Welcome to the Indo Teknik, Dashboard!</p>
        <Link to="/product">
          <button>Products</button>
        </Link>
      
        <CardComponent />
      
    </main>
  );
};

export default MainContent;
