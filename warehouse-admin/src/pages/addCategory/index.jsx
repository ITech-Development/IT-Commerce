import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddCategoryPage.css";

const AddCategoryPage = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

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
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     access_token: localStorage.getItem("access_token"),
        //   },
        // }
      );

      if (response.status === 201) {
        // Redirect or show success message
        console.log("Kategori berhasil ditambahkan.");
      } else {
        console.error("Terjadi kesalahan saat menambahkan kategori.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="add-category-container">
      <h1>Tambah Kategori Produk</h1>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Kategori:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Tambah Kategori</button>
          <Link to="/dashboardProducts">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
