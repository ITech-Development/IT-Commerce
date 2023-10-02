import React, { useState } from "react";
import axios from "axios";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
import styled, { keyframes } from "styled-components";

const loadingContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
};

const shadowAnimation = keyframes`
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  100% {
    box-shadow: none;
  }
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
  max-height: 330px;

  &:hover {
    animation: ${shadowAnimation} 1s ease-in-out infinite;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 7px;
`;

const Price = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  padding-top: 2px;
`;

const ProductCard = ({ product, onAddToCart }) => {
  const starRating = 1;
  return (
    <Card>
      <a href={`/products/${product.id}`}>
        <CardImage src={product.image} alt={product.name} />
      </a>
      <CardContent>
        <Title>{product.name.split(" ").slice(0, 5).join(" ")}...</Title>
        <Price>Rp.{product.unitPrice.toLocaleString("id-ID")}</Price>
        <div
          style={{
            width: "90px",
            margin: "0",
            padding: "5",
            position: "relative",
            left: "-30px",
            top: "5px",
          }}
          className="star-rating"
        >
          {/* Render star images for the star rating */}
          {[...Array(starRating)].map((_, index) => (
            <img
              key={index}
              style={{ maxWidth: "15px" }}
              src={Star} // Replace with your star icon image
              alt="rating"
            />
          ))}
          <p
            style={{
              position: "relative",
              top: "1px",
              left: "5px",
              fontSize: "12px",
            }}
          >
            5.0
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  width: "97.2%",
};

const searchInputStyle = {
  padding: "8px",
  height: "30px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "10px",
  flex: 1,
};

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("name"); // Initialize the selectedSortOption state
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  
  const handleAddToCart = async (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const url =
        "https://indoteknikserver-732012365989.herokuapp.com/product-carts";
      try {
        const response = await axios.post(url, product, {
          headers: { access_token: accessToken },
        });
        console.log(response.data, " ???Asdas");
      } catch (err) {
        console.log("asdsad");
      }
    } else {
      alert("login dulu dong");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSortOptionChange = (event) => {
    setSelectedSortOption(event.target.value); // Update the selectedSortOption state
  };
  
  // Filter and sort the data based on searchQuery and selectedSortOption
  const handleCategoryCheckboxChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      // If the checkbox is checked, add the category to the selectedCategories
      setSelectedCategories([...selectedCategories, category]);
    } else {
      // If the checkbox is unchecked, remove the category from the selectedCategories
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };
  const filteredAndSortedData = data
  ? data
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) => {
        // Filter products by selected categories
        if (selectedCategories.length === 0) {
          return true; // If no categories are selected, show all products
        }
        return selectedCategories.includes(product.category);
      })
      .sort((a, b) => {
        switch (selectedSortOption) {
          case "price":
            return a.unitPrice - b.unitPrice;
          case "stock":
            return a.stock - b.stock;
          default:
            // Sort by name by default
            return a.name.localeCompare(b.name);
        }
      })
  : [];

  return (
    <>
      <Corousel />
      <div className="productlist-container">
        {isLoading ? (
          <div style={loadingContainerStyle}>
            <FadeLoader color="#007bff" loading={isLoading} size={50} />
          </div>
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          <>
            <h2 className="productlist-title">Produk Rekomendasi</h2>
            <div style={searchContainerStyle}>
              <input
                className="dropSearch"
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={searchInputStyle}
                placeholder="Cari Produk Berdasarkan Nama..."
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "10px 20px 10px 20px",
                  maxHeight: "450px",
                  width: "1250px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <h2>Filter</h2>
                  <hr />
                  <div>
                    <h3>Kategori</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label className="container">
                        <input type="checkbox" checked={selectedCategories.includes("Delivery Valve")}
                          onChange={handleCategoryCheckboxChange}/>
                        <span className="checkmark"></span>
                        Delivery Valve
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={selectedCategories.includes("Element")}
                          onChange={handleCategoryCheckboxChange}/>
                        <span className="checkmark"></span>
                        Element
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={selectedCategories.includes("Head Rotor")}
                          onChange={handleCategoryCheckboxChange}/>
                        <span className="checkmark"></span>
                        Head Rotor
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={selectedCategories.includes("Nozzle")}
                          onChange={handleCategoryCheckboxChange}/>
                        <span className="checkmark"></span>
                        Nozzle
                      </label>
                    </div>
                  </div>{" "}
                  <hr />
                  <div>
                    <h3>Harga</h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* <label className="container">
                        <input
                          type="radio"
                          value="name"
                          checked={selectedSortOption === "name"}
                          onChange={handleSortOptionChange}
                        />
                        Berdasarkan Nama
                      </label> */}
                      <label className="container">
                        <input
                          type="radio"
                          value="price"
                          checked={selectedSortOption === "price"}
                          onChange={handleSortOptionChange}
                        />
                        Harga Terendah - Tertinggi
                      </label>
                      <label className="container">
                        <input
                          type="radio"
                          value="stock"
                          checked={selectedSortOption === "stock"}
                          onChange={handleSortOptionChange}
                        />
                        Stok Paling Sedikit - Terbanyak
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="CardGridContainer">
                {filteredAndSortedData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
