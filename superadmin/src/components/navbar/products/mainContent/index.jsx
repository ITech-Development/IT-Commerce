// MainContent.js
import React from 'react';
// import TableComponent from '../table';
// import { Link } from 'react-router-dom'

const MainContent = () => {
  // const [showAddForm, setShowAddForm] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   age: '',
  //   email: '',
  // });

  // const handleAddButtonClick = () => {
  //   setShowAddForm(true);
  // };

  // const handleFormChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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
      {/* <p>Welcome to the dashboard!</p> */}
      {/* <p>Daftar Produk</p> */}
      {/* <button onClick={handleAddButtonClick}>Add</button> */}

      <TableComponent />

    </main>
  );
};

export default MainContent;
