/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
// import { useGetAllProductsQuery } from "../../features/productsApi";
import { useGetProductsQuery } from "../../features/product/apiProducts";
import "./terlaris.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
import styled, { keyframes } from "styled-components";

const ProductCard = ({ product, onAddToCart }) => {
  const starRating = 1;
  return (
    <Card>
      <a href={`/products/${product.id}`}>
        <CardImage src={product.image} alt={product.name} />
      </a>
      <CardContent>
        <Title>{product.name.split(" ").slice(0, 4).join(" ")}...</Title>
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
  const [sortOption, setSortOption] = useState("name");
  const [displayedCards, setDisplayedCards] = useState(28);

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
  const handleLoadMore = () => {
    setDisplayedCards((prevDisplayedCards) => prevDisplayedCards + 28);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredAndSortedData = data
    ? data
        .filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortOption) {
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
      <div className="prdtlrs">
        <h2 className="titleTer">Produk Terlaris</h2>

        <ProductListContainer>
          {isLoading ? (
            <div style={loadingContainerStyle}>
              <FadeLoader color="#007bff" loading={isLoading} size={50} />
            </div>
          ) : error ? (
            <p>An error occurred</p>
          ) : (
            <>
              <div className="productsLIST">
                <SearchContainerStyle>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={searchInputStyle}
                    placeholder="Produk apa yang anda cari ?.."
                  />
                </SearchContainerStyle>
                <CardGridContainers>
                  {filteredAndSortedData
                    .slice(0, displayedCards)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                </CardGridContainers>
                {displayedCards < filteredAndSortedData.length && (
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      maxWidth: "1420px",
                      margin: "auto",
                    }}
                  >
                    <button className="muat" onClick={handleLoadMore}>
                      Muat Lebih Banyak
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </ProductListContainer>
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

const CardGridContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  // padding: 10px 10px 19px 10px;
  border-radius: 5px;
  margin: 5px 0px;
  // max-height: 282px;
  height: auto;
  width: auto;
  box-shadow: none;
  &:hover {
    animation: ${shadowAnimation} 1s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 5px 5px 0 0;
`;

const CardContent = styled.div`
  padding: 10px 10px 19px 10px;
  @media (max-width: 768px) {
    margin: 0;
    width: auto;
    padding: auto;
  }
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

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: auto;
  @media (max-width: 768px) {
  }
`;

const LoadMoreButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
