import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../../features/productsApi";

import { useNavigate } from "react-router-dom";


function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { data, error, isLoading } = useGetAllProductsQuery();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3100/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error, 'There was an error.');
      });
  }, [id]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "1320px",
          margin: "auto",
        }}
      >
        <div style={{ padding: "15px 0 0 50px" }}>
          {product ? (
            <>
              <div>
                <img src={product.image} alt={product.name} />
              </div>
              <div>
                <h2>{product.name}</h2>
                <p>Description: {product.description}</p>
                <p>Category: {product && product.categories && product.categories?.name}</p>
                <p>Type: {product.types?.name}</p>
                <p>Condition: {product.condition}</p>
                <p>Minimum Order: {product.minimumOrder}</p>
                <p>Unit Price: Rp.{product.unitPrice}</p>
                <p>Status: {product.status}</p>
                <p>Stock: {product.stock}</p>
                <p>Weight: {product.weight}</p>
                <p>Size: {product.size}</p>
                <p>Shipping Insurance: {product.shippingInsurance}</p>
                <p>Delivery Service: {product.deliveryService}</p>
                <p>Author ID: {product.authorId}</p>
              </div>
              <button
                style={{
                  cursor: "pointer",
                  padding: "13px  25px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              >
                Order Now
              </button>
              <button
                style={{
                  cursor: "pointer",
                  padding: "13px  25px",
                  backgroundColor: "white",
                  color: "blue",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                Add to Cart
              </button>
            </>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
