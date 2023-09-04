import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart2.png";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here
const accessToken = localStorage.getItem("access_token");

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

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
              console.error(error, "There was an error fetching related products.");
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
      if (product.product_owners?.name === 'Indo Riau') {
        handleAddToCart()
        navigate('/check-TransIR')
      } else if (product.product_owners?.name === 'Juvindo') {
        handleAddToCart()
        navigate('/check-TransJuvindo')
      } else if (product.product_owners?.name === 'Itech') {
        handleAddToCart()
        navigate('/check-TransITech')
      }
    } else {
      alert("Login terlebih dahulu agar dapat belanja");
      // navigate("/login");
    }
  }

  const handleAddRelatedToCart = (relatedProduct) => {
    if (accessToken) {
      axios
        .post(`${API_URL}/product-carts`, relatedProduct, {
          headers: { access_token: accessToken },
        })
        .then(({ data }) => {
          console.log(data, "Related product berhasil ditambahkan ke keranjang");
        })
        .catch((err) => {
          console.log(err, "Terjadi masalah saat menambahkan related product ke keranjang");
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
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <Price>
            Harga: <strong>Rp. {product.unitPrice}</strong>
          </Price>
          <Stock>
            Stok Tersisa: <strong>{product.stock}</strong>
          </Stock>
          <hr />
          <Specifications>
            <SpecificationItem>
              Kategori: <strong>{product.categories?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Tipe: <strong>{product.types?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Minimum Order: <strong>{product.minimumOrder}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Berat: <strong>{product.weight} cm</strong>
            </SpecificationItem>
            <SpecificationItem>
              Tinggi: <strong>{product.height} cm</strong>
            </SpecificationItem>
            <SpecificationItem>
              Lebar: <strong>{product.width} cm</strong>
            </SpecificationItem>
            <SpecificationItem>
              Product Owner: <strong>{product.product_owners?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Author: <strong>{product.authors?.fullName}</strong>
            </SpecificationItem>
          </Specifications>
          <div style={{ marginTop: "30px" }}>
            <BuyNowButton onClick={handleBuyNow}>Buy Now</BuyNowButton>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </AddToCartButton>
          </div>
        </ProductInfo>
      </ProductDetailWrapper>

      <Description>
        <h3>Deskripsi</h3>
        <p>{product.description}</p>
      </Description>

      <RelatedProducts>
        <h3>Produk Terkait</h3>
        {relatedProducts.length > 0 ? (
          <div>
            {relatedProducts
              .filter((relatedProduct) => relatedProduct.types?.name === product.types?.name)
              .map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id}>
                  <Link to={`/products/${relatedProduct.id}`}>
                    <RelatedProductImage src={relatedProduct.image} alt={relatedProduct.name} />
                  </Link>
                  <RelatedProductName>{relatedProduct.name}</RelatedProductName>
                  <RelatedProductPrice>Rp.{relatedProduct.unitPrice}</RelatedProductPrice>
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

                      <img style={{ maxWidth: "24px" }} src={CartIcon} alt="Cart" />
                    ) : (
                      <p style={{ color: 'black', margin: '0', padding: '0', fontSize: '7px', fontWeight: '700' }}>Out of stock</p>
                    )}
                  </button>
                </RelatedProductCard>
              ))}
          </div>
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
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const RelatedProductName = styled.h4`
  margin: 0;
`;

const RelatedProductPrice = styled.h6`
  margin: 0;
`;

const RelatedProductImage = styled.img`
  max-width: 100px;
  border-radius: 5px;
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
  max-width: 1420px;
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
  margin-top: 10px
  margin-bottom: 10px;
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
`;

const SpecificationItem = styled.div`
  flex: 0 0 48%;
  margin-bottom: 10px;
`;

const Description = styled.div`
  max-width: 1205px;
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
  max-width: 1420px;
  width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const BuyNowButton = styled.button`
  padding: 12px 35px;
  margin-right: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddToCartButton = styled.button`
  padding: 12px 35px;
  margin-left: 5px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default ProductDetailPage;
