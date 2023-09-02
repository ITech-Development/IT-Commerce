import React, { useState } from "react";
import axios from "axios";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import { FadeLoader } from "react-spinners";
// import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const loadingContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px", // Atur ketinggian minimum sesuai kebutuhan
};

const ProductCard = ({ product, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const starRating = 5;
  return (
    <div className="product-card">
      <a
        href={`/products/${product.id}`}
        className="view-product-button"
        style={linkStyle}
      >
        <img src={`${API_URL}/${product.image}`} alt={product.name} />
      </a>
      <div className="product-details">
        <h3>{product.category}</h3>
        <h3 style={{ padding: "5px 0", margin: "0" }}>
          {product.name.split(" ").slice(0, 5).join(" ")}...
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "90px" }} className="star-rating">
              {/* Render star images for the star rating */}
              {[...Array(starRating)].map((_, index) => (
                <img
                  key={index}
                  style={{ maxWidth: "15px" }}
                  src={Star} // Replace with your star icon image
                  alt="rating"
                />
              ))}
            </div>
            <span className="price">
              Rp.{product.unitPrice.toLocaleString("id-ID")}
            </span>
            {/* <p>Stock: {product.stock}</p> */}
          </div>
          <button
      className={`add-to-cart-button ${product.stock === 0 ? "out-of-stock" : ""}`}
      onClick={() => onAddToCart(product)}
      disabled={product.stock === 0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {product.stock > 0 ? (
        <>
          <ShoppingCartIcon style={{ color: "white" }} />
          <span style={{ marginLeft: "5px", display: hovered ? "inline" : "none" }}>
            Add to Cart
          </span>
        </>
      ) : (
        "Out of Stock"
      )}
    </button>
        </div>
      </div>
    </div>
  );
};

const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  width: "100%",
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
    </>
  );
};

export default ProductList;
