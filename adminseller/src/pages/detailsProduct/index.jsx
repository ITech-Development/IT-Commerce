import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

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
              Kondisi: <strong>{product.condition}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Minimum Order: <strong>{product.minimumOrder}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Stok: <strong>{product.stock}</strong>
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
              Author: <strong>{product.authors?.name}</strong>
            </SpecificationItem>
          </Specifications>
          <div style={{ marginTop: "30px" }}>
            <Link to="/product">
            <button>Back</button>
            </Link>
          </div>
        </ProductInfo>
      </ProductDetailWrapper>

      <Description>
        <h3>Deskripsi</h3>
        <p>{product.description}</p>
      </Description>
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: relative;
  top: 80px;
`;

const ProductDetailWrapper = styled.div`
  max-width: 1350px;
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
max-width: 1350px;
width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export default ProductDetailPage;
