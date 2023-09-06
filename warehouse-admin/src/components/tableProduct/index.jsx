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
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  GetApp as GetAppIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import "./tablePro.css";
import styled from "styled-components";
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const NoUnderlineLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weigth: bold;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const TableComponent = () => {
  const [product, setProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    categories: "",
    types: "",
    productOwner: "",
    author: "",
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/products/?_sort=id&_order=asc`)
      .then(({ data }) => {
        setProduct(data);
        setFilteredProduct(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleDownloadPdf = () => {
    const pdfElement = document.getElementById("product-table");

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Generate the PDF from the HTML element
    pdf.html(pdfElement, {
      callback: (pdf) => {
        // Save the PDF file
        pdf.save("products_table.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  const handleDownloadCsv = () => {
    const csvContent = createCsvContent();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "products_table.csv");
  };

  const createCsvContent = () => {
    let csvContent =
      "ID,Name,Categories,Types,Description,Minimum Order,Unit Price,Stock,Weight,Height,Width,Product Owner,Author\n";
    filteredProduct?.forEach((row) => {
      const rowData = [
        row.id,
        row.name,
        row.categories?.name,
        row.types?.name,
        row.description,
        row.minimumOrder,
        row.unitPrice,
        row.stock,
        row.weight,
        row.height,
        row.width,
        row.length,
        row.product_owners?.name,
        row.authors?.fullName,
      ];
      const rowString = rowData.map((data) => `"${data}"`).join(",");
      csvContent += rowString + "\n";
    });
    return csvContent;
  };

  const handlePrint = () => {
    const actionColumn = document.getElementsByClassName("action-column");
    for (let i = 0; i < actionColumn.length; i++) {
      actionColumn[i].style.display = "none";
    }
    const imageColumn = document.getElementsByClassName("image-column");
    for (let i = 0; i < imageColumn.length; i++) {
      imageColumn[i].style.display = "none";
    }

    const table = document.getElementById("product-table");
    const newWindow = window.open();
    newWindow.document.write(table.outerHTML);
    newWindow.document.close();
    newWindow.print();

    // for (let i = 0; i < actionColumn.length; i++) {
    //   actionColumn[i].style.display = "";
    // }
  };

  useEffect(() => {
    if (product) {
      const filteredData = product.filter((item) => {
        const nameMatch = item.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());
        const categoriesMatch = item.categories?.name
          .toLowerCase()
          .includes(filters.categories.toLowerCase());
        const typesMatch = item.types?.name
          .toLowerCase()
          .includes(filters.types.toLowerCase());
        const productOwnerMatch = item.product_owners?.name
          .toLowerCase()
          .includes(filters.productOwner.toLowerCase());
        const authorMatch = item.authors?.fullName
          .toLowerCase()
          .includes(filters.author.toLowerCase());

        return (
          nameMatch &&
          categoriesMatch &&
          typesMatch &&
          productOwnerMatch &&
          authorMatch
        );
      });
      filteredData.sort((a, b) => a.id - b.id);

      setFilteredProduct(filteredData);
    }
  }, [product, filters]);

  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        setProduct((prevProducts) =>
          prevProducts.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error(error, "There was an error while deleting the product.");
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
        <TextField
          label="Categories"
          value={filters.categories}
          name="categories"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Types"
          value={filters.types}
          name="types"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Product Owner"
          value={filters.productOwner}
          name="productOwner"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Author"
          value={filters.author}
          name="author"
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <button
          onClick={handleDownloadPdf}
          style={{
            display: "flex",
            padding: "10px 20px",
            background: "green",
            color: "white",
            justifyContent: "end",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            width: "auto",
            cursor: "pointer",
          }}
        >
          <GetAppIcon style={{ marginRight: "5px" }} /> Download PDF
        </button>
        <button
          onClick={handleDownloadCsv}
          style={{
            display: "flex",
            padding: "10px 20px",
            background: "orange",
            color: "white",
            justifyContent: "end",
            border: "none",
            borderRadius: "5px",
            width: "auto",
            cursor: "pointer",
          }}
        >
          <GetAppIcon style={{ marginRight: "5px" }} /> Download CSV
        </button>
        <button
          onClick={handlePrint}
          style={{
            display: "flex",
            padding: "10px 20px",
            background: "orange",
            color: "white",
            justifyContent: "end",
            border: "none",
            borderRadius: "5px",
            width: "auto",
            cursor: "pointer",
          }}
        >
          <PrintIcon style={{ marginRight: "5px" }} /> Print
        </button>
      </div>
      <div className="product-table">
        <TableContainer component={Paper} style={{ width: "100%" }}>
          <Table className="bordered-table">
            <TableHead>
              <TableRow>
                {/* <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  ID
                </TableCell> */}
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                  className="image-column"
                >
                  Gambar
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Nama Produk
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Kategori
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Merek
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Deskripsi
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Minimum Beli
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Harga
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Stok
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Berat
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Tinggi
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Lebar
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Length
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Product Owner
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Penulis
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
              {filteredProduct?.map((row) => (
                <TableRow key={row.id}>
                  {/* <TableCell>{row.id}</TableCell> */}
                  <TableCell>
                    {row.image ? (
                      <img
                        src={row.image}
                        alt={row.name}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <NoUnderlineLink to={`/product/${row.id}`}>
                      <BoldText>
                        {row.name.split(" ").slice(0, 6).join(" ")} 
                      </BoldText>{" "}...
                    </NoUnderlineLink>{" "}
                  </TableCell>
                  <TableCell>{row.categories?.name}</TableCell>
                  <TableCell>{row.types?.name}</TableCell>
                  <TableCell
                    style={{
                      maxHeight: "60px", // Set your desired maximum height
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {row.description.split(" ").slice(0, 6).join(" ")}...
                  </TableCell>
                  <TableCell>{row.minimumOrder.toLocaleString('id-ID')}</TableCell>
                  <TableCell> Rp.{row.unitPrice.toLocaleString('id-ID')}</TableCell>
                  <TableCell>{row.stock.toLocaleString('id-ID')} unit</TableCell>
                  <TableCell>{row.weight.toLocaleString('id-ID')} gram</TableCell>
                  <TableCell>{row.height.toLocaleString('id-ID')} cm</TableCell>
                  <TableCell>{row.width.toLocaleString('id-ID')} cm</TableCell>
                  <TableCell>{row.length} cm</TableCell>
                  <TableCell>{row.product_owners?.name}</TableCell>
                  <TableCell>{row.authors?.fullName}</TableCell>
                  <TableCell className="action-column">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link to={`/edit-product/${row.id}`}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteProduct(row.id)}
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
    </div>
  );
};

export default TableComponent;
