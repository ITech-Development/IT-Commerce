import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductListByCategory({ categoryId }) {
  const [products, setProducts] = useState([]);

  const API_URL = "http://localhost:3100"; 

  useEffect(() => {
    // Fetch products by category using Axios
    axios.get(`http://localhost:3100/products?categoryId=${categoryId}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryId]);

  const filteredProducts = products.filter(product => product.categoryId === categoryId);

  return (
    <div className="ProductList">
      <h2>Products in Category {categoryId}</h2>
      <div className="ProductCardContainer">
        {filteredProducts.map(product => (
          <div key={product.id} className="ProductCard">
            <img src={`${API_URL}/${product.image}`}  alt={product.name} width="200px"/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListByCategory;
