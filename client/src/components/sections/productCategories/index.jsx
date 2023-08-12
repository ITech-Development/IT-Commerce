import React, { useState, useEffect } from 'react';
// import './ProductCategories.css';
import axios from 'axios';

function ProductCategories() {
  const [data, setData] = useState([]);
  console.log(data, 'test datdatatttt');
  const apiUrl = 'http://localhost:3100/product-categories/';

  useEffect(() => {
    // Fetch data using Axios
    axios.get(apiUrl)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="ProductCategories">
        <h1>Card Display Product Categories</h1>
        <div className="card-container">
          {data.map(item => (
            <div key={item.id} className="card">
              <h2>{item.name}</h2>
              <img src={item.image} alt="gapapa ga ada" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductCategories;
