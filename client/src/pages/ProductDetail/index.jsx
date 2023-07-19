import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3100/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, [id]);

  const handleAddToCart = (product) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "http://localhost:3100/product-carts";
      axios({
        url,
        method: "post",
        data: product,
        headers: { access_token: accessToken },
      })
        .then(({ data }) => {
          console.log(data, " ???Asdas");
        })
        .catch((err) => {
          console.log("asdsad");
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ maxWidth: "1420px", padding: "50px 0 0 0", margin: "auto" }}>
      {product ? (
        <>
          <div style={{ display: "flex" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "auto",
                height: "100%",
                alignContent: "center",
                padding: "23px 0 0 0",
              }}
            />

            <div
              style={{
                paddingLeft: "150px",
                width: "auto",
                maxWidth: "1420px",
              }}
            >
              <h2>{product.name}</h2>
              <div style={{ lineHeight: "10px" }}>
                <p style={{ fontSize: "18px" }}>
                  Harga : <strong>Rp.{product.unitPrice} </strong>
                </p>
                <p style={{ fontSize: "18px" }}>
                  Stok Tersisa : <strong>{product.stock}</strong>
                </p>
              </div>
              <h3
                style={{ fontSize: "20px", position: "relative", top: "12px" }}
              >
                Spesifikasi
              </h3>
              <div
                style={{
                  display: "flex",
                  border: "0.1px solid gray",
                  borderRadius: "10px",
                  lineHeight: "18px",
                  padding: "25px 25px 25px 42px",
                  width: "168%",
                  margin: "18px 0",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>
                    Kategori{" "}
                    <strong style={{paddingLeft: '80px' }}> : {product && product.categories && product.categories.name}</strong>
                  </p>
                  <p>Tipe  <strong style={{paddingLeft: '110px' }}> : {product.types?.name}</strong></p>
                  <p>Kondisi  <strong style={{paddingLeft: '89px' }}> : {product.condition}</strong></p>
                  <p>Minimum Order  <strong style={{paddingLeft: '28px' }}> : {product.minimumOrder}</strong></p>
                  <p>Status  <strong style={{paddingLeft: '98px' }}> :  {product.status} </strong></p>
                </div>
                <div style={{ paddingRight: "20%" }}>
                  <p>Lebar<strong style={{paddingLeft: '106px' }}> : {product.weight} cm</strong></p>
                  <p>Ukuran<strong style={{paddingLeft: '94px' }}> : {product.size} cm</strong></p>
                  <p>Asuransi Pengiriman<strong style={{paddingLeft: '1px' }}> : {product.shippingInsurance}</strong></p>
                  <p>Layanan Pengiriman<strong style={{paddingLeft: '4px' }}> : {product.deliveryService}</strong></p>
                  <p>Author ID<strong style={{paddingLeft: '77px' }}> : {product.authorId}</strong></p>
                </div>
              </div>
              <button
                style={{
                  cursor: "pointer",
                  padding: "13px 25px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
              >
                Buy Now
              </button>
              <button
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  padding: "13px 25px",
                  backgroundColor: "white",
                  color: "blue",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
          <p
            style={{
              display: "flex",
              border: "1px solid gray",
              width: "auto",
              padding: "20px",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Deskripsi
            <span
              style={{
                paddingTop: "20px",
                fontWeight: 400,
                fontSize: "18px",
              }}
            >
              <br /> {product.description}
            </span>
          </p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetailPage;
