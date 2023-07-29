// Table.js
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3100"; // Define your API URL here

const TableComponent = () => {
  const [product, setProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then(({ data }) => {
        setProduct(data);
        setFilteredProduct(data); // Initially, filteredProduct will have the same data as product
      })
      .catch((error) => {
        console.error(error.response?.data ?? "There was an error.");
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        // Remove the deleted product from the state
        setProduct((prevProducts) =>
          prevProducts.filter((item) => item.id !== id)
        );
        // Remove the deleted product from the filtered state
        setFilteredProduct((prevProducts) =>
          prevProducts.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error(error, "There was an error while deleting the product.");
      });
  };

  const handleFilter = (filterText) => {
    if (!filterText) {
      setFilteredProduct(product);
    } else {
      const filteredData = product.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.categories?.name
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          item.types?.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.condition.toLowerCase().includes(filterText.toLowerCase()) ||
          item.description.toLowerCase().includes(filterText.toLowerCase()) ||
          (item.voucherId !== null &&
            item.voucherId.toLowerCase().includes(filterText.toLowerCase()))
      );
      setFilteredProduct(filteredData);
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "auto",
        maxWidth: "1400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "10px", display: "flex", justifyContent: "end" }}>
        <input
          style={{ padding: "10px 20px", flex: 1, maxWidth: "500px" }}
          type="text"
          placeholder="Search by name, category, type, and more.."
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Minimum Order</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Voucher</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProduct?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.categories?.name}</TableCell>
              <TableCell>{row.types?.name}</TableCell>
              <TableCell>
                <img
                  src={row.image}
                  alt={row.image}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </TableCell>
              <TableCell>{row.condition}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.minimumOrder}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.superAdmins.fullName}</TableCell>
              <TableCell>
                {row.voucherId === null ? "null" : row.voucherId}
              </TableCell>
              <TableCell>
                <Link to={`/edit/${row.id}`}>
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
