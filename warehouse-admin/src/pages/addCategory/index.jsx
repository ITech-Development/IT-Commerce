import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addStyleCategories.css";
import { Link } from "react-router-dom";

const AddCategoryPage = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: null,
    // Add more attributes if needed
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewCategory({ ...newCategory, image: imageFile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/product-categories",
        newCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: localStorage.getItem('access_token')
          }
        }
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
      <h1>Add New Category</h1>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="image">Gambar:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
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
