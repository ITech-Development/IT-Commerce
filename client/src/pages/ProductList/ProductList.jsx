import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useGetAllProductsQuery } from "../../features/productsApi";
import { useGetProductsQuery } from "../../features/product/apiProducts";
import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
import styled, { keyframes } from "styled-components";
import logoFilterMobile from '../../assets/filter.png'
import FilterMobile from "./FilterMobile";

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
  width: "80%",
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
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const { data, error, isLoading } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("name"); // Initialize the selectedSortOption state
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categories, setCategories] = useState([]);


  const [showFilterM, setShowFilterM] = useState(false);

  const [showNotavailable, setShowNotAvailable] = useState(false);

  const [minPrice, setMinPrice] = useState(""); // State untuk harga minimum
  const [maxPrice, setMaxPrice] = useState(""); // State untuk harga maksimum




  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const toggleFilter = () => {
    setShowFilterM(!showFilterM); // Ini akan membalikkan nilai showFilter
  };

  useEffect(() => {
    // Define the API endpoint to fetch categories from your backend
    const categoriesApiUrl = "http://localhost:3100/product-categories/";

    axios.get(categoriesApiUrl)
      .then((response) => {
        // Assuming the response data is an array of category objects
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // Empty dependency array to fetch categories only once on component mount


  const handleCategoryDropdownChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategories(selectedCategory); // Update the selectedCategories state
  };

  const handleAddToCart = async (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const url =
        "http://localhost:3100/product-carts";
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


  const filteredAndSortedData = data
    ? data
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) => {
        if (selectedCategories.length === 0) {
          return true;
        }
        return selectedCategories.includes(product.categories.name);
      })
      .filter((product) => {
        if (minPrice !== "" && maxPrice !== "") {
          // Filter produk berdasarkan harga minimum dan maksimum
          return (
            product.unitPrice >= parseInt(minPrice) &&
            product.unitPrice <= parseInt(maxPrice)
          );
        }
        return true; // Tampilkan semua produk jika harga minimum dan maksimum tidak ditentukan
      })
      .sort((a, b) => {
        switch (selectedSortOption) {
          case "price":
            return a.unitPrice - b.unitPrice;
          case "stock":
            return a.stock - b.stock;
          default:
            return a.name.localeCompare(b.name);
        }
      })
    : [];

  useEffect(() => {
    if (filteredAndSortedData.length === 0) {
      setShowNotAvailable(true);
    } else {
      setShowNotAvailable(false);
    }
  }, [filteredAndSortedData]);

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
                // marginLeft: "20px",
                margin: "auto",
                width: "auto",
              }}
            >
              <div
                style={{
                  width: "280px",
                  paddingTop: "30px",

                }}
              >
                <div style={{ width: "280px", paddingTop: "30px" }} className="filter">
                  <h2>Filter</h2>
                  <hr />
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div className="category-filter">
                      {/* Replace your category dropdown with the following */}
                      <label>Kategori:</label>
                      <select
                        value={selectedCategories}
                        onChange={handleCategoryDropdownChange}
                        className="filterDropdown"
                      >
                        <option value="">Semua</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {" "}
                  <hr />
                  <div className="price-filter">
                    <label>Harga:</label>
                    <input
                      type="number"
                      placeholder="Minimum"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      min={1}
                    />
                    <input
                      type="number"
                      placeholder="Maksimum"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      min={1}
                    />
                  </div>{" "}
                  <hr />
                  <div className="stock-filter">
                    <label>Stok:</label>
                    <select value={selectedSortOption} onChange={handleSortOptionChange} className="filterDropdown">
                      <option value="">Semua</option>
                      <option value="stock">Minimum</option>
                      <option value="-stock">Maksimum</option>
                    </select>
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
                <div>
                  <img
                    src={logoFilterMobile}
                    alt="logoFilterMobile"
                    width='20px'
                    className="imageFilter"
                    onClick={toggleFilter} />
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
                {showNotavailable && (
                  <p>Tidak tersedia</p>
                )}
              </div>
              {showFilterM && <FilterMobile
                selectedCategories={selectedCategories}
                handleCategoryDropdownChange={handleCategoryDropdownChange}
                categories={categories}
                selectedSortOption={selectedSortOption}
                handleSortOptionChange={handleSortOptionChange}

              />}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;

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