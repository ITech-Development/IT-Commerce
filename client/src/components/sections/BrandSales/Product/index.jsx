import React, { useState } from "react";
import axios from "axios";
import { useGetAllProductsQuery } from "../../../../features/productsApi";
import { Link } from "react-router-dom";
import "./productliststyle.css";
import "../../../../App.css";
import Star from "../../../../assets/star.png";
import CartIcon from "../../../../assets/cart2.png";
import { FadeLoader } from "react-spinners";
import { Carousel } from "react-responsive-carousel"; // Import the Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const loadingContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
};

const CustomProductCarousel = ({ products, onAddToCart }) => {
  const chunkSize = 4; // Display 4 products per slide
  const productChunks = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }

  return (
    <Carousel showThumbs={false}>
      {productChunks.map((chunk, index) => (
        <div key={index} className="carousel-slide">
          <div className="product-carousel-row">
            {chunk.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  const starRating = 5;
  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        
      <img src={`${API_URL}/${product.image}`} alt={product.name} />
      </Link>
      <div className="details">
        <h3 >{product.categories?.name}</h3>
        <Link to={`/products/${product.id}`}>
          <h3 style={{ padding: "5px 0", margin: "0" }}>{product.name}</h3>
        </Link>
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
            {/* <p>Stock: {product.stock}</p> */}
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
              <p
                style={{
                  color: "black",
                  margin: "0",
                  padding: "0",
                  fontSize: "7px",
                  fontWeight: "700",
                }}
              >
                Out of stock
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleAddToCart = async (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const url = "https://indoteknikserver-732012365989.herokuapp.com/product-carts";
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
      <div style={{ display: "flex", justifyContent: "row", margin: '20px 40px' }}>
        <img
          style={{ maxWidth: "340px", height: "340px" }}
          src="https://res.cloudinary.com/dcbryptkx/image/upload/v1692322294/IndoTeknikMarketplace/product/banner/Banner%20Dan%20Card%20Spesial%20Kemerdekaan/Card_Promo_Bawah_2_muamuo.png"
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
              <CustomProductCarousel
                products={filteredAndSortedData}
                onAddToCart={handleAddToCart}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
