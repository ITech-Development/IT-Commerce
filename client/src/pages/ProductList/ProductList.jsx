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
  width: "96.3%",
  marginLeft: "20px",
};

const searchInputStyle = {
  padding: "8px 8px 8px 15px",
  height: "30px",
  width: "auto",
  borderRadius: "4px",
  border: "1px solid #ccc",
  // marginRight: "10px",
  margin: "0",
  flex: 1,
};

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("name"); // Initialize the selectedSortOption state
  // const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

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
  // const handleCategoryCheckboxChange = (event) => {
  //   const category = event.target.value;
  //   if (event.target.checked) {
  //     // If the checkbox is checked, add the category to the selectedCategories
  //     setSelectedCategories([...selectedCategories, category]);
  //   } else {
  //     // If the checkbox is unchecked, remove the category from the selectedCategories
  //     setSelectedCategories(selectedCategories.filter((c) => c !== category));
  //   }
  // };
  const filteredAndSortedData = data
    ? data
        .filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        // .filter((product) => {
        //   // Filter products by selected categories
        //   if (selectedCategories.length === 0) {
        //     return true; // If no categories are selected, show all products
        //   }
        //   return selectedCategories.includes(product.category);
        // })
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

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  maxHeight: "450px",
                  maxWidthwidth: "1350px",
                  marginTop: "20px",
                }}
              >
                <div style={{ width: "280px", paddingTop: "30px" }}>
                  <h2>Filter</h2>
                  <hr />
                  <div>
                    <h3>Kategori</h3>
                    <div className="containPrice">
                      <label>
                        <input
                          type="radio"
                          // checked={selectedCategories.includes(
                          //   "Delivery Valve"
                          // )}
                          // onChange={handleCategoryCheckboxChange}
                        />
                        <p className="filterCategories">Delivery Valve</p>
                      </label>
                      <label>
                        <input
                          type="radio"
                          // checked={selectedCategories.includes("Element")}
                          // onChange={handleCategoryCheckboxChange}
                        />
                        <p className="filterCategories">Element</p>
                      </label>
                      <label>
                        <input
                          type="radio"
                          // checked={selectedCategories.includes("Head Rotor")}
                          // onChange={handleCategoryCheckboxChange}
                        />
                        <p className="filterCategories">Head Rotor</p>
                      </label>
                      <label>
                        <input
                          type="radio"
                          // checked={selectedCategories.includes("Nozzle")}
                          // onChange={handleCategoryCheckboxChange}
                        />
                        <p className="filterCategories">Nozzle</p>
                      </label>
                    </div>
                  </div>{" "}
                  <hr />
                  <div>
                    <h3>Harga</h3>
                    <div className="containPrices">
                      <label>
                        <input
                          type="radio"
                          value="price"
                          checked={selectedSortOption === "price"}
                          onChange={handleSortOptionChange}
                        />
                        <p className="filterCategoriess">Harga Terendah - Tertinggi</p>
                      </label>
                    </div>
                  </div>{" "}
                  <hr />
                  <div>
                    <h3>Stok</h3>
                    <div className="containPrices">
                      <label>
                        <input
                          type="radio"
                          value="stock"
                          checked={selectedSortOption === "stock"}
                          onChange={handleSortOptionChange}
                        />
                        <p className="filterCategoriess">Stok Paling Sedikit - Terbanyak</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productsLIST">
                <div style={searchContainerStyle}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={searchInputStyle}
                    placeholder="Produk apa yang anda cari ?.."
                  />
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
