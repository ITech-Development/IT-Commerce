import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductListByCategory({ categoryId }) {
  const [products, setProducts] = useState([]);

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
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListByCategory;
