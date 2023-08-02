// Table.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios'
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:3100"; // Define your API URL here

const TableComponent = () => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(() => {
        // Remove the deleted product from the state
        setProduct((prevProducts) => prevProducts.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error, "There was an error while deleting the product.");
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Minimum Order</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Width</TableCell>
            <TableCell>Product Owner</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.categories?.name}</TableCell>
              <TableCell>{row.types?.name}</TableCell>
              <TableCell>
                <img src={row.image} alt={row.image} style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.minimumOrder}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell>{row.width}</TableCell>
              <TableCell>{row.product_owners?.name}</TableCell>
              <TableCell>{row.authors?.fullName}</TableCell>
              <TableCell>
                <Link to={`/edit-product/${row.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteProduct(row.id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
