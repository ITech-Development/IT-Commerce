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

  // const handleAddButtonClick = () => {
  //   setShowAddForm(true);
  // };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // You can add validation here before adding the data to the table
  //   if (typeof TableComponent.handleAddData === 'function') {
  //     TableComponent.handleAddData(formData);
  //   }
  //   setFormData({
  //     name: '',
  //     age: '',
  //     email: '',
  //   });
  //   setShowAddForm(false);
  // };

  return (
    <main>
      <h2>Main Content</h2>
      <p>Welcome to the dashboard!</p>
      {/* <button onClick={handleAddButtonClick}>Add</button> */}
      <Link to="/add-product">
        <button>Add</button>
      </Link>
      {/* {showAddForm && ( */}
      {/* <form onSubmit={handleFormSubmit}> */}
      {/* Add your form fields for data input here */}
      {/* <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" /> */}
      {/* <input type="number" name="age" value={formData.age} onChange={handleFormChange} placeholder="Age" /> */}
      {/* <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" /> */}
      {/* <button type="submit">Save</button> */}
      {/* </form> */}
      {/* )} */}
      <TableComponent />
    </main>
  );
};

export default MainContent;
