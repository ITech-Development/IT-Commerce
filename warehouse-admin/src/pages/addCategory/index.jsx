import React, { useState } from "react";
import axios from "axios";
import "./addStyleCategories.css";
import { Link } from "react-router-dom";

const AddCategoryPage = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    // Add more attributes if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://indoteknikserver-732012365989.herokuapp.com/product-categories",
        newCategory,
      );

      if (response.status === 201) {
        // Successful response handling
        window.location.href = "/dashboard-categories";
        console.log("Category added successfully.");
      } else {
        // Handle error response
        console.error("Error adding category.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="add-category-container">
      <h1>Kategori Baru</h1>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{paddingTop: '10px', paddingRight: '10px'}}>Nama Kategori : </label>
          <input
          style={{width: '80%'}}
            type="text"
            id="name"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        {/* Add more form inputs for other attributes if needed */}
        <div className="button-group">
          <button type="submit">Tambah Kategori</button>
          {/* Add navigation or other buttons as needed */}
          <Link to="/dashboard-categories">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
