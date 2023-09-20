import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Corousel from "../../components/corousel/product";
import "./productliststyle.css";
import "../../App.css";
import Star from "../../assets/star.png";
import CartIcon from "../../assets/cart2.png";
import { FadeLoader } from "react-spinners";
import { useAddProductToCartMutation, useGetAllProductsQuery,} from "../../features/product/apiProducts";
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

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
  const starRating = 5;

  const originalPrice = product.unitPrice;
  const discountAmount = originalPrice * 0.03;
  const discountedPrice = originalPrice - discountAmount;
  return (
    <div className="product">
      <Link
        to={`/products/${product.id}`}
        className="view-product-button"
        style={linkStyle}
      >
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="details">
        <h3>{product.category}</h3>
        <h3 style={{ padding: "5px 0", margin: "0" }}>{product.name}</h3>
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
            <span className="price">Rp.{product.unitPrice}</span>
            <br />
            <span className="price">
              <i>
                3% <del>{discountedPrice}</del>
              </i>
            </span>
          </div>
          <button
            className="cartyes"
            style={{
              maxWidth: "40px",
              border: "none",
              borderRadius: "50%",
              background: "#DDEFEF",
              cursor: "pointer",
            }}
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? (
              <img style={{ maxWidth: "24px" }} src={CartIcon} alt="Cart" />
            ) : (
              <p style={{ color: 'black', margin: '0', padding: '0', fontSize: '7px', fontWeight: '700' }}>Out of stock</p>
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

  const [addProductToCartMutation] = useAddProductToCartMutation()
 
  

  const handleAddToCart = (product) => {
    console.log(product, '|||||||');
    addProductToCartMutation(product)
      .then((res) => {
        console.log(res);
        // countCarts()
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
