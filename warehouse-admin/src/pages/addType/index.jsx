import React, { useState } from "react";
import axios from "axios";
import "./addStyleTypes.css";
import { Link } from "react-router-dom";

const AddTypePage = () => {
  const [newType, setNewType] = useState({
    name: "",
    // Add more attributes if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewType({ ...newType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://indoteknikserver-732012365989.herokuapp.com/product-types",
        newType
      );

      if (response.status === 201) {
        // Successful response handling
        window.location.href = "/dashboard-types"; // Update the route as needed
        console.log("Type added successfully.");
      } else {
        // Handle error response
        console.error("Error adding type.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="add-category-container">
      <h1>Add New Type</h1>
      <form className="add-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Type Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newType.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        {/* Add more form inputs for other attributes if needed */}
        <div className="button-group">
          <button type="submit">Tambah Tipe</button>
          {/* Add navigation or other buttons as needed */}
          <Link to="/dashboard-types">
            <button>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTypePage;
