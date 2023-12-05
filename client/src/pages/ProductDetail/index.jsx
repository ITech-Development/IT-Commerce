import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Star from "../../assets/star.png";
import "./indexDetail.css";
import { useAddToCartMutation } from "../../features/cart/apiCarts";
import Back from '../../assets/back-button.png'
import { useAddWishlistMutation, useGetWishlistsQuery } from "../../features/wishlist/apiWishlist";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here
const accessToken = localStorage.getItem("access_token");

const ProductDetailPage = () => {
  const starRating = 1;
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [addToCart] = useAddToCartMutation()
  const { data: wishlists } = useGetWishlistsQuery();
  const [addToWishlist] = useAddWishlistMutation()
  const [zoom, setZoom] = useState(1);

  const isInWishlist = wishlists?.some((item) => item.productId === product?.id);


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

  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToCart = () => {
    if (accessToken) {
      addToCart({ product })
        .then((data) => {
          console.log(data);
          setPopupMessage("Sukses memasukkan ke keranjang");
          setShowPopup(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }

  };
  const handleAddToWishlist = () => {
    if (accessToken) {
      addToWishlist(product?.id)
        .then((data) => {
          console.log(data);
          setPopupMessage("Sukses memasukkan ke wishlist");
          setShowPopup(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }

  };

  const handleBuyNow = () => {
    if (accessToken) {
      handleAddToCart();
      navigate("/pay-now");
    } else {
      // alert("Login terlebih dahulu agar dapat belanja");
      navigate("/login");
    }
  };




  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page in the browsing history
  };

  return (
    <div>
      <div className="okeja">
        <Link className="backDetail" onClick={handleGoBack}>
          <img className="back" src={Back} alt="Back" />
          <h3 className="cartTitle">Kembali</h3>
        </Link>
      </div>
      <PopupContainer show={showPopup}>
        <PopupContent>
          <PopupMessage>{popupMessage}</PopupMessage>
          <CloseButton onClick={() => setShowPopup(false)}>x</CloseButton>
        </PopupContent>
      </PopupContainer>
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
          <RatingContainer>
            <StarRatingContainer 
              className="star-rating"
            >
              {/* Render star images for the star rating */}
              {[...Array(starRating)].map((_, index) => (
                <StarImage
                  key={index}
                  style={{ maxWidth: "20px" }}
                  src={Star} // Replace with your star icon image
                  alt="rating"
                />
              ))}
              <RatingText
              >
                5.0
              </RatingText>
            </StarRatingContainer >
            <VerticalLine />
            <SoldText>
        <SalesCount>10RB+</SalesCount> Terjual
      </SoldText>
          </RatingContainer>
          <Price>Rp. {product.unitPrice.toLocaleString("id-ID")}</Price>
          <Stock>
            Stok Tersisa{" "}
            <strong>: {product.stock.toLocaleString("id-ID")}</strong>
          </Stock>
          <hr />
          <Specifications>
            <SpecificationItem>
              Kategori
              <strong className="category" style={{ paddingLeft: "50px" }}>
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
          </Specifications>
          <div className="buyDetail" style={{ marginTop: "30px" }}>
            <BuyNowButton onClick={handleBuyNow}>Beli Sekarang</BuyNowButton>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Keranjang" : "Stok Habis"}
            </AddToCartButton>
            <AddToWishButton
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
            >
              {isInWishlist ? 'Dalam Wishlist' : 'Wishlist'}
            </AddToWishButton>
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
                <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }} target="blank">
                <RelatedProductCard key={relatedProduct.id}>
                    <RelatedProductImage
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                    />
                  <Pembungkus>
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
                  </Pembungkus>
                </RelatedProductCard></Link>
              ))}
          </RelatedProductGrid>
        ) : (
          <p>Tidak ada produk terkait dengan tipe yang sama.</p>
        )}
      </RelatedProducts>
    </ProductDetailContainer>
    </div>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 5px;
  padding: 0;
  z-index: 999;
  text-align: center;
  display: ${(props) => (props.show ? "block" : "none")};
  .PopupContent {
    background-color: #fff;
    border-radius: 5px;
    padding: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    color: #333;
    width: 100%;
    position: relative;

    /* Close button */
    &::before {
      content: "✕"; /* Unicode character for 'X' */
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
    }
`;

const PopupContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 15px 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  color: #333;
  width: 100%;
  height: 60px;
  @media (max-width: 768px) {
    diplay: flex;
    justify-content: center;
    width: auto;
    margin: auto;
    padding: 30px;

  }
`;


const PopupMessage = styled.p`
  @media (max-width: 768px) {
    diplay: flex;
    justify-content: center;
    width: auto;
    margin: auto;

  }
`;

const CloseButton = styled.button`
background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px 15px;
  position: relative;
  top: -100px;
  margin-left: 100%;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0ef0f0;
    color: #2b3b3b;
    font-weigth: 800;
  }

  @media (max-width: 768px) {
    position: relative;
    margin-top: -100px;
  }
`;


const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  @media (max-width: 768px) {
    padding-left: 12px;
  }
`;

const StarRatingContainer = styled.div`
  display: flex;
  align-content: center;
  margin: 0;
`;

const StarImage = styled.img`
  max-width: 20px;
`;

const RatingText = styled.p`
  font-size: 18px;
  margin: 0 10px;
`;

const VerticalLine = styled.div`
  height: 20px;
  border-right: 1px solid #000;
  margin: 0 15px 0 20px;
`;

const SoldText = styled.p`
  margin: 0;
  // color: gray;
  `;
  
  const SalesCount = styled.span`
  font-weight: bold;
  color: gray;
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

const RelatedProductCard = styled.div`
  border: 1px solid #ccc;
  // padding: 10px 10px 19px 10px;
  border-radius: 5px;
  margin: 5px 0px;
  // max-height: 282px;
  height: auto;
  width: auto;
  box-shadow: none;
  &:hover {
    animation: ${shadowAnimation} 1s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;

  }
`;

const Pembungkus = styled.div`
  padding: 10px 10px 19px 10px;
  @media (max-width: 768px) {
    margin: 0;
    width: auto;
    padding: auto;
  }
`;

const RelatedProductPrice = styled.h6`
  margin: 0;
  font-size: 16px;
`;

const RelatedProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  // position: relative;
  // top: -10px;
  // left: -10px;
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
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // gap: 10px;
    margin: 0;
  }
`;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: relative;

`;

const ProductDetailWrapper = styled.div`
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-arround;
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
    width: 100%;
  }
`;

const ProductImage = styled.img`
  max-width: 360px;
  border-radius: 5px;
  border: none;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

const ProductImageSub = styled.img`
  max-width: 80px;
  border-radius: 5px;
  border: none;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    display: none;
    margin: auto;
    justify-content: space-arround;
    align-items: center;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0;
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
    font-size: 30px;
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
  flex: 0 0 50%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  strong {
    font-weight: bold;
    margin-left: 10px; // Mengganti padding-left menjadi margin-left
  }


  // @media (max-width: 768px) {
  //   flex: 0 0 100%; // Menggunakan 100% lebar pada layar kecil
  //   margin-left: 0; // Menghapus margin kiri pada layar kecil
  //   margin-bottom: 10px;

  //   strong {
  //     margin: 0; // Menghapus margin kiri pada teks tebal
  //     text-align: right; // Mengatur teks tebal ke kanan
  //     padding-right: 10px; // Memberi jarak kanan pada teks tebal

  //   }
  // }
`;

const Description = styled.div`
  // max-width: 1225px;
  width: auto;
  display: flex;
  margin: 20px 30px;
  flex-direction: column;
  padding: 5px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    display: flex;
    width: auto;
    margin: 5px 0px;
    padding: 0 10px;
    border: none;
    border-radius: none;
    box-shadow: none;
  }
`;

const RelatedProducts = styled.div`
  // max-width: 1262px;
  width: auto;
  margin: 20px 30px;
  display: flex; /* Change to flex display */
  flex-direction: column;
  @media (max-width: 768px) {
    display: flex;
    max-width: 380px;
    margin: 0 10px;
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

const AddToWishButton = styled.button`
  padding: 12px 35px;
  margin-left: 15px;
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

  @media (max-width: 768px) {
    display: flex;
    margin: 10px 0 0 0;
    width: auto;
  }
`;

export default ProductDetailPage;
