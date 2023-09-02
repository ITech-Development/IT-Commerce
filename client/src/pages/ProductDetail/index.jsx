import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart2.png";
import Star from '../../assets/star.png'

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here
const accessToken = localStorage.getItem("access_token");

const ProductDetailPage = () => {
  const starRating = 5;
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  console.log(relatedProducts, "heiheihei");

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

  const handleAddToCart = () => {
    if (accessToken) {
      axios
        .post(`${API_URL}/product-carts`, product, {
          headers: { access_token: accessToken },
        })
        .then(({ data }) => {
          console.log(data, "berhasil ditambahkan ke keranjang");
        })
        .catch((err) => {
          console.log(err, "handle add to cart anda bermasalah");
        });
    } else {
      // navigate("/login");
      alert("Login terlebih dahulu agar dapat belanja");
    }
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

  const handleAddRelatedToCart = (relatedProduct) => {
    if (accessToken) {
      axios
        .post(`${API_URL}/product-carts`, relatedProduct, {
          headers: { access_token: accessToken },
        })
        .then(({ data }) => {
          console.log(
            data,
            "Related product berhasil ditambahkan ke keranjang"
          );
        })
        .catch((err) => {
          console.log(
            err,
            "Terjadi masalah saat menambahkan related product ke keranjang"
          );
        });
    } else {
      alert("Login terlebih dahulu agar dapat belanja");
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <ProductDetailContainer>
      <ProductDetailWrapper>
        <ProductImage src={`${API_URL}/${product.image}`} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <Price>
            Harga<strong  style={{paddingLeft: '43px'}}> : Rp. {product.unitPrice.toLocaleString("id-ID")}</strong>
          </Price>
          <Stock>
            Stok Tersisa<strong> : {product.stock.toLocaleString("id-ID")}</strong>
          </Stock>
          <hr />
          <Specifications>
            <SpecificationItem>
              Kategori<strong  style={{paddingLeft: '50px'}}> : {product.categories?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Brand <strong>  : {product.types?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Minimum Order <strong> : {product.minimumOrder.toLocaleString("id-ID")}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Berat<strong  style={{paddingLeft: '6px'}}> : {product.weight.toLocaleString("id-ID")} </strong> gram
            </SpecificationItem>
            <SpecificationItem>
              Tinggi <strong style={{paddingLeft: '69px'}}> : {product.height.toLocaleString("id-ID")} </strong> cm
            </SpecificationItem>
            <SpecificationItem>
              Lebar <strong  style={{paddingLeft: '4px'}}> : {product.width.toLocaleString("id-ID")} </strong> cm
            </SpecificationItem>
            {/* <SpecificationItem>
              Product Owner: <strong>{product.product_owners?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Author: <strong>{product.authors?.fullName}</strong>
            </SpecificationItem> */}
          </Specifications>
          <div style={{ marginTop: "30px" }}>
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
            lineHeight: "20px",
            whiteSpace: "pre-line",
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
                  <Link to={`/products/${relatedProduct.id}`}>
                    <RelatedProductImage
                      src={`${API_URL}/${relatedProduct.image}`}
                      alt={relatedProduct.name}
                    />
                  </Link>
                  <RelatedProductName>
                    {relatedProduct.name.split(" ").slice(0, 4).join(" ")}...
                  </RelatedProductName>
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
                  <RelatedProductPrice>
                    Rp. {relatedProduct.unitPrice.toLocaleString("id-ID")}
                  </RelatedProductPrice>
                  <button
                    className="cartyes"
                    style={{
                      maxWidth: "40px",
                      border: "none",
                      borderRadius: "50%",
                      background: "#DDEFEF",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddRelatedToCart(relatedProduct)}
                    disabled={relatedProduct.stock === 0}
                  >
                    {relatedProduct.stock > 0 ? (
                      <img
                        style={{ maxWidth: "24px" }}
                        src={CartIcon}
                        alt="Cart"
                      />
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

const RelatedProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin: 0 5px;
`;

const RelatedProductPrice = styled.h6`
  margin: 0px 0 10px 0;
  font-size: 16px;
`;

const RelatedProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const RelatedProductName = styled.h3`
  margin-top: 10px;
  font-size: 16px;
`;

const RelatedProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
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
  min-width: 1225px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  max-width: 200px;
  margin-right: 20px;
  border-radius: 5px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`;

const ProductName = styled.h2`
  margin-top: 30px
  margin-bottom: 10px;
  max-width: 700px;
  font-size: 21px;
`;

const Price = styled.p`
  margin: 0;
  margin-bottom: 10px;
`;

const Stock = styled.p`
  margin: 0;
  margin-bottom: 20px;
`;

const Specifications = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1350px;
`;

const SpecificationItem = styled.div`
  flex: 0 0 48%;
  margin-bottom: 10px;
`;

const Description = styled.div`
  max-width: 1225px;
  width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const RelatedProducts = styled.div`
  max-width: 1262px;
  width: 100%;
  margin: 20px auto;
  display: flex; /* Change to flex display */
  flex-direction: column;
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
