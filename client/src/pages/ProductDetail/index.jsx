import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Star from "../../assets/star.png";
import "./indexDetail.css";
// import { useDispatch } from "react-redux";
import { useAddToCartMutation } from "../../features/cart/apiCarts";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here
const accessToken = localStorage.getItem("access_token");

const ProductDetailPage = () => {
  const starRating = 1;
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [addToCart] = useAddToCartMutation()
  const [zoom, setZoom] = useState(1);

  const handleImageMouseMove = (e) => {
    // Calculate the cursor position relative to the container
    const container = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Calculate the zoom level based on the cursor position
    const zoomX = (x / container.clientWidth) * 2;
    const zoomY = (y / container.clientHeight) * 2;
    setZoom(Math.min(zoomX, zoomY));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        // Fetch related products based on the same type
        if (data.types?.name) {
          axios
            .get(`${API_URL}/products?types.name=${data.types.name}`)
            .then(({ data: relatedData }) => {
              setRelatedProducts(relatedData);
            })
            .catch((error) => {
              console.error(
                error,
                "There was an error fetching related products."
              );
            });
        }
      })
      .catch((error) => {
        console.error(error, "There was an error fetching the product.");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error, "There was an error.");
      });
  }, [id]);

  // const dispatch = useDispatch()

  const handleAddToCart = () => {
    addToCart({ product })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleBuyNow = () => {
    if (accessToken) {
      if (product.product_owners?.name === "Indo Riau") {
        handleAddToCart();
        navigate("/check-TransIR");
      } else if (product.product_owners?.name === "Juvindo") {
        handleAddToCart();
        navigate("/check-TransJuvindo");
      } else if (product.product_owners?.name === "Itech") {
        handleAddToCart();
        navigate("/check-TransITech");
      }
    } else {
      alert("Login terlebih dahulu agar dapat belanja");
      // navigate("/login");
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <ProductDetailContainer>
      <ProductDetailWrapper>
        <div className="productDetail">
          <ProductImage
            src={product.image}
            alt={product.name}
            onMouseMove={handleImageMouseMove}
            zoom={zoom}
          />
          <div style={{ display: "flex", maxWidth: "60px", gap: "13px" }}>
            <ProductImageSub
              src={product.image}
              alt={product.name}
              zoom={zoom}
            />
            <ProductImageSub
              src={product.image}
              alt={product.name}
              zoom={zoom}
            />
            <ProductImageSub
              src={product.image}
              alt={product.name}
              zoom={zoom}
            />
            <ProductImageSub
              src={product.image}
              alt={product.name}
              zoom={zoom}
            />
          </div>
        </div>
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <Price>
            Rp. {product.unitPrice.toLocaleString("id-ID")}
          </Price>
          <Stock>
            Stok Tersisa {" "}
            <strong>: {product.stock.toLocaleString("id-ID")}</strong>
          </Stock>
          <hr />
          <Specifications>
            <SpecificationItem>
              Kategori
              <strong style={{ paddingLeft: "50px" }}>
                {" "}
                {product.categories?.name}
              </strong>
            </SpecificationItem>
            <SpecificationItem>
              Merek <strong>{product.types?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Minimum Order{" "}
              <strong>{product.minimumOrder.toLocaleString("id-ID")}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Berat
              <strong style={{ paddingLeft: "6px" }}>
                {" "}
                {product.weight.toLocaleString("id-ID")}{" "}
              </strong>{" "}
              gram
            </SpecificationItem>
            <SpecificationItem>
              Tinggi{" "}
              <strong style={{ paddingLeft: "69px" }}>
                {" "}
                {product.height.toLocaleString("id-ID")}{" "}
              </strong>{" "}
              cm
            </SpecificationItem>
            <SpecificationItem>
              Lebar{" "}
              <strong style={{ paddingLeft: "4px" }}>
                {" "}
                {product.width.toLocaleString("id-ID")}{" "}
              </strong>{" "}
              cm
            </SpecificationItem>
            {/* <SpecificationItem>
              Product Owner: <strong>{product.product_owners?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Author: <strong>{product.authors?.fullName}</strong>
            </SpecificationItem> */}
          </Specifications>
          <div className="buyDetail" style={{ marginTop: "30px" }}>
            <BuyNowButton onClick={handleBuyNow}>Beli Sekarang</BuyNowButton>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Keranjang" : "Stok Habis"}
            </AddToCartButton>
          </div>
        </ProductInfo>
      </ProductDetailWrapper>

      <Description>
        <h3>Deskripsi</h3>
        <p
          style={{
            fontSize: "0.9rem",
            lineHeight: "25px",
            whiteSpace: "normal",
          }}
          dangerouslySetInnerHTML={{
            __html: product.description.replace(/\n/g, "<br>"),
          }}
        />
      </Description>
      <RelatedProducts>
        <h3>Produk Terkait</h3>
        {relatedProducts.length > 0 ? (
          <RelatedProductGrid>
            {relatedProducts
              .filter(
                (relatedProduct) =>
                  relatedProduct.types?.name === product.types?.name
              )
              .map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id}>
                  <Link to={`/products/${relatedProduct.id}`} target="blank">
                    <RelatedProductImage
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                    />
                  </Link>
                  <RelatedProductName>
                    {relatedProduct.name.split(" ").slice(0, 5).join(" ")}...
                  </RelatedProductName>
                  <RelatedProductPrice>
                    Rp. {relatedProduct.unitPrice.toLocaleString("id-ID")}
                  </RelatedProductPrice>
                  <div
                    style={{
                      width: "90px",
                      margin: "0",
                      padding: "0",
                      position: "relative",
                      left: "-30px",
                      top: "4px",
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
                </RelatedProductCard>
              ))}
          </RelatedProductGrid>
        ) : (
          <p>Tidak ada produk terkait dengan tipe yang sama.</p>
        )}
      </RelatedProducts>
    </ProductDetailContainer>
  );
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

const RelatedProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px 10px 15px 10px;
  border-radius: 5px;
  margin: 5px 5px;
  max-height: 282px;
  box-shadow: none;
  &:hover {
    animation: ${shadowAnimation} 1s ease-in-out infinite;
  }
`;

const RelatedProductPrice = styled.h6`
  margin: 0;
  font-size: 16px;
`;

const RelatedProductImage = styled.img`
  max-width: 111.8%;
  height: auto;
  margin: 0;
  padding: 0;
  position: relative;
  top: -10px;
  left: -10px;
  border: none;
  border-radius: 5px 5px 0 0;
`;

const RelatedProductName = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 7px;
`;

const RelatedProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: relative;
  top: 88px;
`;

const ProductDetailWrapper = styled.div`
  max-width: 1225px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    max-width: auto;
  }
`;

const ProductImage = styled.img`
  max-width: 280px;
  margin-right: 20px;
  border-radius: 5px;
  border: none;

  @media (max-width: 768px) {
    max-width: 100%; /* Membuat gambar sesuai dengan lebar layar pada perangkat kecil */
    margin-right: 0;
    margin-bottom: 20px; /* Memberikan jarak antara gambar dan informasi produk */
  }
`;

const ProductImageSub = styled.img`
  max-width: 60px;
  border-radius: 5px;
  border: none;

  @media (max-width: 768px) {
    max-width: 88px;
    margin-bottom: 10px; /* Memberikan jarak antara gambar kecil */
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;

  @media (max-width: 768px) {
    margin-left: 0; /* Menghapus margin kiri pada perangkat kecil */
  }
`;

const ProductName = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  max-width: 700px;
  font-size: 21px;

  @media (max-width: 768px) {
    max-width: 350px;
    font-size: 19px;
    font-weight: 500;
    padding-left: 12px;
    margin-top: 0; /* Menghapus margin atas pada perangkat kecil */
  }
`;

const Price = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-weight: 600;
  color: blue;
  font-size: 22px;

  @media (max-width: 768px) {
    padding-left: 15px;
    font-weight: 600;
    // left: -19px;
    font-size: 20px;
    color: blue;
    margin: 0;
  }
`;

const Stock = styled.p`
  margin: 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding-left: 15px;
    padding-top: 3px;
    font-size: 14px;
  }
`;

const Specifications = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1350px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }
`;

const SpecificationItem = styled.div`
  flex: 0 0 48%;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: flex;

    strong {
      display: block;
      font-weight: bold;
    }
    &:nth-child(1) strong,
    &:nth-child(2) strong,
    &:nth-child(4) strong {
      text-align: right;
      padding-left: 96px;
    }
    &:nth-child(3) strong {
      text-align: right;
      padding-left: 26px;
    }
  }
`;

const Description = styled.div`
  max-width: 1225px;
  width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  padding: 5px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    display: flex;
    max-width: 330px;
  }
`;

const RelatedProducts = styled.div`
  max-width: 1262px;
  width: 100%;
  margin: 20px auto;
  display: flex; /* Change to flex display */
  flex-direction: column;
  @media (max-width: 768px) {
    display: flex;
    max-width: 380px;
  }
`;

const BuyNowButton = styled.button`
  padding: 12px 35px;
  margin-right: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0ef0f0;
    color: #2b3b3b;
    font-weigth: 800;
  }
`;

const AddToCartButton = styled.button`
  padding: 12px 35px;
  margin-left: 5px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: #0ef0f0;
    color: #2b3b3b;
    font-weigth: 800;
  }
`;

export default ProductDetailPage;