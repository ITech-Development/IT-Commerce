import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./tablePro.css"; // Anda dapat menggunakan CSS kustom Anda di sini

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Tentukan URL API Anda di sini

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/product-categories`)
      .then(({ data }) => {
        setCategories(data);
        setFilteredCategories(data);
      })
      .catch((error) => {
        console.error(error, "Terjadi kesalahan.");
      });
  }, []);

  useEffect(() => {
    if (categories) {
      const filteredData = categories.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
      setFilteredCategories(filteredData);
    }
  }, [categories, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const deleteCategory = (id) => {
    axios
      .delete(`${API_URL}/product-categories/${id}`)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error(error, "Terjadi kesalahan saat menghapus kategori.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "auto",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Nama"
          value={filters.name}
          name="name"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </div>
      <TableContainer component={Paper} style={{ width: "auto", margin: "auto" }}>
        <Table className="bordered-table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                Banner
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                Nama
              </TableCell>
              <TableCell
                className="action-column"
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img
                    style={{ width: "500px", height: "100px" }}
                    src={category.image}
                    alt=""
                  />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="action-column">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Link to={`/edit-category/${category.id}`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
