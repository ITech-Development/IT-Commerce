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
  console.log(filteredProduct, 'test filter product apa aja isinya');

  useEffect(() => {
    axios
      .get(`${API_URL}/admin-sellers/voucher`)
      .then(({ data }) => {
        setProduct(data);
        setFilteredProduct(data); // Initially, filteredProduct will have the same data as product
      })
      .catch((error) => {
        console.error(error.response?.data ?? "There was an error.");
      });
  }, []);


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
            <TableCell>Description</TableCell>
            <TableCell>Minimum Order</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Width</TableCell>
            <TableCell>Product Owner</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProduct?.map((row) => (
            <TableRow key={row?.product?.id}>
              <TableCell>{row?.product?.id}</TableCell>
              <TableCell>
                <Link to={`/products/${row?.product?.id}`}>
                {row?.product?.name}
                </Link>
              </TableCell>
              <TableCell>{row?.product?.categories?.name}</TableCell>
              <TableCell>{row?.product?.types?.name}</TableCell>
              <TableCell>
                <img
                  src={`${API_URL}/${row?.product?.image}`}
                  alt={row.image}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </TableCell>
              <TableCell>{row?.product?.description}</TableCell>
              <TableCell>{row?.product?.minimumOrder}</TableCell>
              <TableCell>{row?.product?.unitPrice}</TableCell>
              <TableCell>{row?.product?.stock}</TableCell>
              <TableCell>{row?.product?.weight}</TableCell>
              <TableCell>{row?.product?.height}</TableCell>
              <TableCell>{row?.product?.width}</TableCell>
              <TableCell>{row?.product?.product_owners?.name}</TableCell>
              <TableCell>{row?.product?.authors?.fullName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
