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
            Harga{" "}
            <strong style={{paddingLeft: '43px'}}>: Rp. {product.unitPrice.toLocaleString("id-ID")}</strong>
          </Price>

          <Stock>
            Stok Tersisa<strong> : {product.stock} </strong> unit
          </Stock>
          <hr />
          <Specifications>
            <SpecificationItem>
              Kategori <strong style={{paddingLeft: '50px'}}>: {product.categories?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Merek  <strong>: {product.types?.name}</strong>
            </SpecificationItem>
            {/* <SpecificationItem>
              Kondisi: <strong>{product.condition}</strong>
            </SpecificationItem> */}
            <SpecificationItem>
              Minimum Order{" "}
              <strong>: {product.minimumOrder.toLocaleString("id-ID")}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Stok <strong style={{paddingLeft: '11px'}}> : {product.stock.toLocaleString("id-ID")}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Berat {" "}
              <strong style={{paddingLeft: '73px'}}>: {product.weight.toLocaleString("id-ID")}</strong> gram
            </SpecificationItem>
            <SpecificationItem>
              Tinggi{" "}
              <strong> : {product.height.toLocaleString("id-ID")}</strong> cm
            </SpecificationItem>
            <SpecificationItem>
              Lebar<strong style={{paddingLeft: '71px'}}> : {product.width.toLocaleString("id-ID")}</strong> {" "} cm
            </SpecificationItem>
            {/* <SpecificationItem>
              Product Owner: <strong>{product.product_owners?.name}</strong>
            </SpecificationItem>
            <SpecificationItem>
              Author: <strong>{product.authors?.name}</strong>
            </SpecificationItem> */}
          </Specifications>
          <div style={{ marginTop: "30px" }}>
            <Link to="/">
              <button>Kembali</button>
            </Link>
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
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  position: relative;
  min-width: 1350px;
  top: 80px;
`;

const ProductDetailWrapper = styled.div`
  max-width: 1350px;
  min-width: 1350px;
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
  margin-bottom: 30px;
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
