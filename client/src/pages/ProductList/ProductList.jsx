import React from "react";
import axios from 'axios'
import "../../App.css";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Hero from "../../components/sections/heroProductList";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts'
      axios({ url, method: 'post', data: product, headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, ' ???Asdas');
        })
        .catch((err) => { console.log('asdsad') })
      // dispatch(addToCart(product));
      // navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Hero />
      <div className="productlist-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          <>
            <h2>Produk Rekomendasi</h2>
            <div className="products">
              {data &&
                data.map((product) => (
                  <div key={product.id} className="product">
                    <h3>{product.category}</h3>
                    <img src={product.image} alt={product.name} />
                    <div className="details">
                      <p>{product.name}</p>
                      <span className="price">Rp.{product.unitPrice}</span>
                      <p>Stock: {product.stock}</p>
                    </div>
                    <button
                      style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#4b70e2",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        color: "white",
                        letterSpacing: "1.1",
                        borderRadius: "6px",
                        width: "100%",
                      }}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
