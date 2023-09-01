import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editStyleTypes.css"; // Make sure to have the appropriate CSS file
import { Link, useParams } from "react-router-dom";

const EditTypePage = () => {
  const { id } = useParams(); // Assuming you're using React Router to capture the id
  const [type, setType] = useState({
    name: "",
    // Add more attributes if needed
  });

  useEffect(() => {
    // Fetch the type details from the API using id
    const fetchType = async () => {
      try {
        const response = await axios.get(
          `https://indoteknikserver-732012365989.herokuapp.com/product-types/${id}`
        );
        setType(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setType({ ...type, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://indoteknikserver-732012365989.herokuapp.com/product-types/${id}`,
        type
      );

      if (response.status === 201) {
        // Successful response handling
        window.location.href = "/dashboard-types"; // Update the route as needed
        console.log("Type updated successfully.");
      } else {
        // Handle error response
        console.error("Error updating type.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="edit-category-container">
      <h1>Edit Type</h1>
      <form className="edit-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Type Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={type.name}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        {/* Add more form inputs for other attributes if needed */}
        <div className="button-group">
          <button type="submit">Update Type</button>
          {/* Add navigation or other buttons as needed */}
          <Link to="/dashboard-types">
            <button>
            Back
            </button>
            </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTypePage;
