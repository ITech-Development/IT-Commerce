import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useGetAllProductsQuery } from "../../features/productsApi";
import { useGetProductsQuery } from "../../features/product/apiProducts";
// import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
import styled, { keyframes } from "styled-components";
import logoFilterMobile from "../../assets/filter.png";
import FilterMobile from "./FilterMobile";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const starRating = 1;
  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardImage src={product.image} alt={product.name} />
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
    </Link>
  );
};

const searchInputStyle = {
  padding: "10px 15px", // Mengubah padding
  height: "auto", // Mengatur tinggi input
  width: "100%", // Menjaga lebar 100%
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px", // Mengatur ukuran font
  outline: "none", // Menghapus outline saat input aktif
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
    const categoriesApiUrl =
      "https://indoteknikserver-732012365989.herokuapp.com/product-categories/";

    axios
      .get(categoriesApiUrl)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryDropdownChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategories(selectedCategory);
  };

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          return true;
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
      <div className="categotyListed">
        <img
          className="hero-image"
          src="https://res.cloudinary.com/dcbryptkx/image/upload/v1697853515/IndoTeknikMarketplace/product/banner/Banner%20Page%20All%20Kategori/Banner_All_Kategori_jcse02.png"
          alt=""
        />
        <div className="productlist-container">
          {isLoading ? (
            <div style={loadingContainerStyle}>
              <FadeLoader color="#007bff" loading={isLoading} size={50} />
            </div>
          ) : error ? (
            <p>An error occurred</p>
          ) : (
            <>
              <h3 className="productlist-title">Produk Rekomendasi</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className="filter">
                    <h2>Filter</h2>
                    <hr />
                    <div>
                      <div className="category-filter">
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
                    </div>{" "}
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
                    {/* <hr /> */}
                    {/* <div className="stock-filter">
                      <label>Stok:</label>
                      <select
                        value={selectedSortOption}
                        onChange={handleSortOptionChange}
                        className="filterDropdown"
                      >
                        <option value="">Semua</option>
                        <option value="stock">Minimum</option>
                        <option value="-stock">Maksimum</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="productsLIST">
                  <SearchContainerStyle>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      style={searchInputStyle}
                      placeholder="Produk apa yang anda cari ?.."
                    />
                    <img
                      src={logoFilterMobile}
                      alt="logoFilterMobile"
                      width="20px"
                      className="imageFilter"
                      onClick={toggleFilter}
                    />
                  </SearchContainerStyle>
                  <div className="CardGridContainer">
                    {filteredAndSortedData.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                  {showNotavailable && <p>Tidak tersedia</p>}
                </div>
                {showFilterM && (
                  <FilterMobile
                    closeFilter={toggleFilter}
                    selectedCategories={selectedCategories}
                    handleCategoryDropdownChange={handleCategoryDropdownChange}
                    categories={categories}
                    selectedSortOption={selectedSortOption}
                    handleSortOptionChange={handleSortOptionChange}
                    minPrice={minPrice}
                    handleMinPriceChange={handleMinPriceChange}
                    maxPrice={maxPrice}
                    handleMaxPriceChange={handleMaxPriceChange}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

const SearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: auto;

  @media (max-width: 768px) {
    & {
      position: relative;
    }

    input {
      padding-left: 30px;
    }

    .imageFilter {
      position: absolute;
      left: 5px; /* Menyesuaikan posisi logo filter mobile */
      top: 50%; /* Posisi tengah secara vertikal */
      transform: translateY(-50%); /* Untuk mengatur vertikal ke tengah */
      cursor: pointer;
    }
  }
`;
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
