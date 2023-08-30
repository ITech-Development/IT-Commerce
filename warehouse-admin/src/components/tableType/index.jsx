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
import "./tablePro.css"; // You can use your own CSS here

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const TypeTable = () => {
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/product-types`)
      .then(({ data }) => {
        setTypes(data);
        setFilteredTypes(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  useEffect(() => {
    if (types) {
      const filteredData = types.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
      setFilteredTypes(filteredData);
    }
  }, [types, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const deleteType = (id) => {
    axios
      .delete(`${API_URL}/product-types/${id}`)
      .then(() => {
        setTypes((prevTypes) =>
          prevTypes.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error(error, "There was an error while deleting the type.");
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Name"
          value={filters.name}
          name="name"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </div>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table className="bordered-table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                Name
              </TableCell>
              <TableCell
                className="action-column"
                style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>
                  <Link to={`/type/${type.id}`}>
                    {type.name}
                  </Link>
                </TableCell>
                <TableCell className="action-column">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to={`/edit-type/${type.id}`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteType(type.id)}
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

export default TypeTable;
