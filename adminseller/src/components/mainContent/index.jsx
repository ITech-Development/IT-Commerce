// MainContent.js
import React, { useState } from 'react';
import TableComponent from '../table';
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
