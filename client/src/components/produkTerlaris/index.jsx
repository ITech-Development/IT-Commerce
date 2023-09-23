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
  max-width: 300px; /* Atur lebar maksimum sesuai kebutuhan Anda */
  width: 100%; /* Gunakan lebar 100% agar sesuai dengan wadahnya */

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

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1420px;
  margin: 0 auto;
  padding: 20px; /* Atur sesuai kebutuhan Anda */
  @media (max-width: 768px) {
    position: relative;
    top: -220px;
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

const CardGridContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

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

const ProductList = () => {
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const { data, error, isLoading } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [displayedCards, setDisplayedCards] = useState(7);

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
    setDisplayedCards((prevDisplayedCards) => prevDisplayedCards + 7);
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
      <ProductListContainer>
        {isLoading ? (
          <div style={loadingContainerStyle}>
            <FadeLoader color="#007bff" loading={isLoading} size={50} />
          </div>
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          <>
          <CardGridContainers>
              {filteredAndSortedData.slice(0, displayedCards).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </CardGridContainers>
            {/* Tampilkan tombol "Muat Lebih Banyak" jika jumlah kartu yang ditampilkan belum mencapai total */}
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
          </>
        )}
      </ProductListContainer>
    </>
  );
};

export default ProductList;