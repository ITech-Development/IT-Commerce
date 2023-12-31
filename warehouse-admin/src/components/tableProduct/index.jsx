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
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com";

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

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [owners, setOwners] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedOwn, setSelectedOwner] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const [editingProductId, setEditingProductId] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");

  const handleEditPrice = (productId, currentPrice) => {
    setEditingProductId(productId);
    setEditedPrice(currentPrice);
  };

  const saveEditedPrice = (productId) => {
    // Make an HTTP request to update the price for the given product ID.
    axios
      .put(
        `${API_URL}/products/${productId}`,
        { unitPrice: editedPrice },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then(() => {
        // Update the local state with the new price.
        setProduct((prevProducts) =>
          prevProducts.map((item) => {
            if (item.id === productId) {
              return { ...item, unitPrice: editedPrice };
            }
            return item;
          })
        );
        // Reset the editing state.
        setEditingProductId(null);
      })
      .catch((error) => {
        console.error(error, "There was an error while updating the price.");
      });
  };

  useEffect(() => {
    // Lakukan permintaan HTTP untuk mendapatkan daftar kategori dari API
    axios
      .get(`${API_URL}/product-categories`)
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  useEffect(() => {
    // Lakukan permintaan HTTP untuk mendapatkan daftar kategori dari API
    axios
      .get(`${API_URL}/product-types`)
      .then(({ data }) => {
        setTypes(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  useEffect(() => {
    // Lakukan permintaan HTTP untuk mendapatkan daftar kategori dari API
    axios
      .get(`${API_URL}/product-owners`)
      .then(({ data }) => {
        setOwners(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

  useEffect(() => {
    // Lakukan permintaan HTTP untuk mendapatkan daftar kategori dari API
    axios
      .get(`${API_URL}/warehouse-admins`)
      .then(({ data }) => {
        setAuthors(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, []);

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

    if (name === "categories") {
      setSelectedCategory(value);
    } else if (name === "types") {
      setSelectedType(value);
      // Update the "types" filter as well
      setFilters((prevFilters) => ({
        ...prevFilters,
        types: value,
      }));
    } else if (name === "productOwner") {
      setSelectedOwner(value);
      // Update the "productOwner" filter as well
      setFilters((prevFilters) => ({
        ...prevFilters,
        productOwner: value,
      }));
    } else if (name === "author") {
      setSelectedAuthor(value); // Update the selectedAuthor state variable
      // Update the "author" filter as well
      setFilters((prevFilters) => ({
        ...prevFilters,
        author: value,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
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
      const filteredData = product
        .filter((item) => {
          const nameMatch = item.name
            .toLowerCase()
            .includes(filters.name.toLowerCase());
          const categoriesMatch =
            selectedCategory === "" ||
            item.categories?.name.toLowerCase() ===
              selectedCategory.toLowerCase();
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
        })
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

      setFilteredProduct(filteredData);
    }
  }, [product, filters, selectedCategory]);

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
        <div variant="outlined" size="small">
          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              handleFilterChange(event);
            }}
            label="Category"
            name="categories"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div variant="outlined" size="small">
          <select
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value);
              handleFilterChange(event);
            }}
            label="Type"
            name="types"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div variant="outlined" size="small">
          <select
            value={selectedOwn}
            onChange={(event) => {
              setSelectedOwner(event.target.value);
              handleFilterChange(event); // Pastikan ini sesuai dengan event yang benar
            }}
            label="Owner"
            name="productOwner" // Pastikan nama ini sesuai dengan objek filters
          >
            <option value="">All Owners</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.name}>
                {owner.name}
              </option>
            ))}
          </select>
        </div>
        <div variant="outlined" size="small">
          <select
            value={selectedAuthor}
            onChange={(event) => {
              setSelectedAuthor(event.target.value);
              handleFilterChange(event); // Pastikan ini sesuai dengan event yang benar
            }}
            label="Author"
            name="author" // Pastikan nama ini sesuai dengan objek filters
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author.id} value={author.fullName}>
                {author.fullName}
              </option>
            ))}
          </select>
        </div>

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
                  Merek
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Kategori
                </TableCell>
                {/* <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Deskripsi
                </TableCell> */}
                {/* <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                Minimum Beli
                </TableCell> */}
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
                {/* <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Panjang
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Lebar
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Tinggi
                </TableCell> */}
                {/* <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#e6f7ff" }}
                >
                  Berat
                </TableCell> */}
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
                        {row.name}

                        {/* {row.name.split(" ").slice(0, 25).join(" ")}  */}
                      </BoldText>{" "}
                    </NoUnderlineLink>{" "}
                  </TableCell>
                  {/* <TableCell>
                    {row.stock.toLocaleString("id-ID")} unit
                  </TableCell> */}
                  <TableCell>{row.types?.name}</TableCell>
                  <TableCell>{row.categories?.name}</TableCell>
                  {/* <TableCell
                    style={{
                      maxHeight: "60px", // Set your desired maximum height
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {row.description.split(" ").slice(0, 6).join(" ")}...
                  </TableCell>
                  <TableCell>{row.minimumOrder.toLocaleString('id-ID')}</TableCell> */}
                  <TableCell>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '150px'}}>
                      <span style={{backgroundColor: '#F1EAFF', padding: '10.5px ', border: 'none', borderRadius: '5px', marginRight: '-5px', fontSize: '12px'}}>Rp</span>
                      <input
                        type="number"
                        value={
                          editingProductId === row.id
                            ? editedPrice
                            : row.unitPrice
                        }
                        onChange={(e) => {
                          if (editingProductId === row.id) {
                            setEditedPrice(e.target.value);
                          } else {
                            handleEditPrice(row.id, row.unitPrice);
                          }
                        }}
                        onBlur={() => {
                          if (editingProductId === row.id) {
                            saveEditedPrice(row.id);
                            // Tambahkan kode notifikasi di sini
                            alert("Sukses merubah harga");
                          }
                        }}
                        min="1"
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    {row.stock.toLocaleString("id-ID")} unit
                  </TableCell>
                  {/* <TableCell>{row.length} cm</TableCell>
                  <TableCell>{row.width.toLocaleString('id-ID')} cm</TableCell>
                  <TableCell>{row.height.toLocaleString('id-ID')} cm</TableCell>
                  {/* <TableCell>{row.weight.toLocaleString('id-ID')} gram</TableCell> */}
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
