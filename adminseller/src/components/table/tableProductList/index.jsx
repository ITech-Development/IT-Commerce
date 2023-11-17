// ProductList.js

import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.categories.name}</td> {/* Adjust accordingly if your data structure is different */}
              <td>{product.types.name}</td> {/* Adjust accordingly if your data structure is different */}
              <td>{product.description}</td>
              <td>${product.unitPrice}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
