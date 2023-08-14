import React, { useState, useEffect } from 'react';
// import './ProductCategories.css';
import ProductListByCategory from '../productListByCategory'; // Adjust the path accordingly
import axios from 'axios';

function ProductCategories() {
  const [data, setData] = useState([]);
  console.log(data, 'test datdatatttt');
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

  return (
    <>
      {/* ... (existing JSX code) */}
      <div className="card-container">
        {data.map(item => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleCategoryClick(item.id)} // Add this line
          >
            <h2>{item.name}</h2>
            <img src={item.image} alt="gapapa ga ada" />
          </div>
        ))}
      </div>
      {selectedCategoryId !== null && (
        <ProductListByCategory categoryId={selectedCategoryId} />
      )}
    </>
  );
}

export default ProductCategories;
