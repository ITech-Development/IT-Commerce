import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddTypePage.css";

const AddTypePage = () => {
  const [newType, setNewType] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/product-types",
        newType,
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     access_token: localStorage.getItem("access_token"),
        //   },
        // }
      );

      if (response.status === 201) {
        // Redirect or show success message
        console.log("Tipe berhasil ditambahkan.");
      } else {
        console.error("Terjadi kesalahan saat menambahkan tipe.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="add-type-container">
      <h1>Tambah Kategori Produk</h1>
      <form className="add-type-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama Tipe:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newType.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Tambah Tipe</button>
          <Link to="/dashboardProducts">
            <button>Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTypePage;
