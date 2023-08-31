import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here
const accessToken = localStorage.getItem("access_token");

const ProductDetailPage = () => {
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

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct.types?.name === product.types?.name
  );

  return (
    <ProductDetailContainer>
      <ProductDetailWrapper>
      <ProductImage src={`${API_URL}/${product.image}`} alt={product.name} />

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
      <RelatedProductGrid>
      {filteredRelatedProducts.map((relatedProduct) => (
        <RelatedProductCard key={relatedProduct.id}>
          <Link to={`/products/${relatedProduct.id}`}>
            <RelatedProductImage
              src={`${API_URL}/${relatedProduct.image}`}
              alt={relatedProduct.name}
            />
          </Link>
          <RelatedProductName>{relatedProduct.name}</RelatedProductName>
          {/* Add more details or buttons if needed */}
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
  padding: 20px;
  text-align: center;
`;

const RelatedProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const RelatedProductName = styled.h3`
  margin-top: 10px;
`;

const RelatedProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;


// const RelatedProductCard = styled.div`
//   flex: 0 0 calc(25% - 20px); /* Adjust card width and spacing for 4 cards per row */
//   border: 1px solid #ccc;
//   padding: 10px;
//   margin-bottom: 20px; /* Add space below cards */
//   border-radius: 5px;
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const RelatedProductName = styled.h4`
//   margin: 10px 0;
//   text-align: center;
// `;

// const RelatedProductImage = styled.img`
//   max-width: 100px;
//   border-radius: 5px;
// `;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: relative;
  top: 88px;
`;

const ProductDetailWrapper = styled.div`
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
  max-width: 700px;
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
