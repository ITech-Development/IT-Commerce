import React, { useState } from "react";
import axios from "axios";
import { useGetAllProductsQuery } from "../../features/productsApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import "../../App.css";
import Hero from '../../assets/bannerproduct1.jpg';

const checkoutButtonStyle = {
  backgroundColor: "#4b70e2",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
};

const checkoutButtonStyleDetail = {
  backgroundColor: "#4b70e2",
  position: "relative",
  top: "-10.8px",
  color: "white",
  padding: "10px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
  textDecoration: "none",
  fontSize: '11px'
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const ProductCard = ({ product, onAddToCart }) => {
  const fadeAnimationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
  });

  return (
    <animated.div style={fadeAnimationProps} className="product">
      <h3>{product.category}</h3>
      <img src={product.image} alt={product.name} />
      <div className="details">
        <p>{product.name}</p>
        <span className="price">Rp.{product.unitPrice}</span>
        <p>Stock: {product.stock}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <button
          style={{
            marginTop: "10px",
            padding: "8px 10px",
            fontSize: '11px',
            ...checkoutButtonStyle,
          }}
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
        <button style={checkoutButtonStyleDetail}>
          <Link
            to={`/products/${product.id}`}
            className="view-product-button"
            style={linkStyle}
          >
            Detail
          </Link>
        </button>
      </div>
    </animated.div>
  );
};

const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  width: '100%',
};

const searchInputStyle = {
  padding: "8px",
  height: '30px',
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "10px",
  flex: 1,
};

const sortSelectStyle = {
  padding: "8px",
  height: '48px',
  fontWeight: '500',
  borderRadius: "4px",
  border: "1px solid #ccc",
  minWidth: "200px",
};

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleAddToCart = async (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const url = "http://localhost:3100/product-carts";
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
      navigate("/login");
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
      <div style={{ marginTop: "60px" }}>
        <img src={Hero} alt="" />
        <div className="productlist-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>An error occurred</p>
          ) : (
            <>
              <h2 style={{ margin: "30px 0 20px 0", textAlign: "start" }}>
                Produk Rekomendasi
              </h2>
              <div style={searchContainerStyle}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  style={searchInputStyle}
                  placeholder="Search products..."
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
              <div className="products">
                {filteredAndSortedData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
