import React, { useState, useEffect } from 'react';
// import './ProductCategories.css';
import ProductListByCategory from '../productListByCategory'; // Adjust the path accordingly
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductCategories() {
  const [data, setData] = useState([]);
  const apiUrl = 'http://localhost:3100/product-categories/';
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    axios.get(apiUrl)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // return (
  //   <>
  //     {/* ... (existing JSX code) */}
  //     <div className="card-container">
  //       {data.map(item => (
  //         <div
  //           key={item.id}
  //           className="card"
  //           onClick={() => handleCategoryClick(item.id)} // Add this line
  //         >
  //           <h2>{item.name}</h2>
  //           <img src={item.image} alt="gapapa ga ada" />
  //         </div>
  //       ))}
  //     </div>
  //     {selectedCategoryId !== null && (
  //       <ProductListByCategory categoryId={selectedCategoryId} />
  //     )}
  //   </>
  // );
  return (
    <div>
      <Link to="/nozzle">
        <h1>Nozzle</h1>
      </Link>
      <Link to="/delivery-valve">
        <h1>Delivery Valve</h1>
      </Link>
      <Link to="/element">
        <h1>Element</h1>
      </Link>
      <Link to="/ve-pump">
        <h1>VE Pump</h1>
      </Link>
      <Link to="/ve-pump-parts">
        <h1>VE Pump Parts</h1>
      </Link>
      <Link to="/head-rotor">
        <h1>Head Rotor</h1>
      </Link>
    </div>
  )
}

export default ProductCategories;
