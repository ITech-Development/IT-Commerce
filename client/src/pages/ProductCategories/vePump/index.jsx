import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../App.css";
import "./vePump.css";
import styled, { keyframes } from "styled-components";
import Star from "../../../assets/star.png";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com";

const ProductCard = ({ product, onAddToCart }) => {
  const starRating = 1;
  // const originalPrice = product.unitPrice;
  // const discountAmount = originalPrice * 0.03;
  // const discountedPrice = originalPrice - discountAmount;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [vePumpCategory, SetVEPumpCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getVEPumpCategory();
  }, []);

  useEffect(() => {
    // Filter and sort products based on search query and sort option
    const filteredAndSortedProducts = vePumpCategory
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "price") {
          return a.unitPrice - b.unitPrice;
        } else if (sortOption === "stock") {
          return a.stock - b.stock;
        }
        // Return 0 when no sorting condition is met
        return 0;
      });

    setFilteredProducts(filteredAndSortedProducts);
  }, [searchQuery, sortOption, vePumpCategory]);

  const getVEPumpCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/ve-pump`);
      const jsonData = response.data;
      SetVEPumpCategory(Array.isArray(jsonData) ? jsonData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddToCart = async (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const url = `${API_URL}/product-carts`;
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
      alert("Login dulu dong");
      // navigate("/login");
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="categotyListed">
        <img
          className="hero-image"
          src="https://res.cloudinary.com/dcbryptkx/image/upload/v1694142748/IndoTeknikMarketplace/product/banner/Banner%20Kategori/Ve_PUMP_vblt9y.jpg"
          alt=""
        />
        <h3 style={{ textAlign: "center" }} className="productlist-title">
          Ve Pump
        </h3>

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
          <div className="CardGridContainerss">
            {filteredProducts.map((product) => (
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
