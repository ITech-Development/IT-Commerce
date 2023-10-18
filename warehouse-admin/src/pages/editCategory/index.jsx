import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./editStyleCategories.css";

const EditCategoryPage = () => {
  const { id } = useParams(); // Assuming you're using React Router to capture the id
  const [category, setCategory] = useState({
    name: "",
    image: null
    // Add more attributes if needed
  });

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setCategory({ ...category, image: imageFile });
  };

  useEffect(() => {
    // Fetch the category details from the API using id
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://indoteknikserver-732012365989.herokuapp.com/product-categories/${id}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://indoteknikserver-732012365989.herokuapp.com/product-categories/${id}`,
        category, {
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          access_token: localStorage.getItem('access_token'),
          // Tambahkan header lainnya sesuai kebutuhan
        },
      }
      );

      if (response.status === 200) {
        // Successful response handling
        window.location.href = "/dashboard-categories";
        console.log("Category updated successfully.");
      } else {
        // Handle error response
        console.error("Error updating category.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="edit-category-container">
      <h1>Edit Kategori</h1>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{paddingTop: '10px', paddingRight: '10px'}}>Nama Kategori</label>
          <input
            style={{width: '80%'}}
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className="form-group">
          {/* Tambahkan input form lainnya sesuai atribut yang ada pada produk */}
          <label htmlFor="image">Gambar:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {category.image && <img src={category.image} alt="Category" width="200px" />}
          <br />
        </div>
        {/* Add more form inputs for other attributes if needed */}
        <div className="button-group">
          <button type="submit">Update Category</button>
          {/* Add navigation or other buttons as needed */}
          <Link to="/dashboard-categories">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryPage;
