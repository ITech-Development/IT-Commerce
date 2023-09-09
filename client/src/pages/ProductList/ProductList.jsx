import React, { useState } from "react";
import axios from "axios";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
import styled, {keyframes} from "styled-components";

// const linkStyle = {
//   color: "white",
//   textDecoration: "none",
// };

const loadingContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
};

const CardGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  padding: 20px;
`;

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
  max-height: 323px;

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
            padding: "0",
            position: "",
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

const sortSelectStyle = {
  padding: "8px",
  height: "48px",
  fontWeight: "500",
  borderRadius: "4px",
  border: "1px solid #ccc",
  minWidth: "200px",
};

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

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
        // dispatch(addToCart(product));
        // navigate('/cart');
      } catch (err) {
        console.log("asdsad");
      }
    } else {
      alert("login dulu dong");
      // navigate("/login");
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
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
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={searchInputStyle}
                placeholder="Cari Produk Berdasarkan Nama..."
              />
              <select
                value={sortOption}
                onChange={handleSortOptionChange}
                style={sortSelectStyle}
              >
                <option value="name">Berdasarkan Nama</option>
                <option value="price">Harga Terendah - Tertinggi</option>
                <option value="stock">Stok Paling Sedikit - Terbanyak</option>
              </select>
            </div>

            <CardGridContainer>
              {filteredAndSortedData.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </CardGridContainer>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
