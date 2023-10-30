import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductCategoriesQuery } from "../../features/product/apiProducts";
import styled, { keyframes } from "styled-components";
import Star from "../../assets/star.png";
import { Link } from "react-router-dom";

const CategoryDetail = () => {
  const starRating = 1;
  const { id } = useParams(); // Mendapatkan id dari URL
  const { data: categories } = useGetProductCategoriesQuery(); // Menggunakan query yang sudah didefinisikan sebelumnya

  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState(""); // State untuk filter pencarian
  const [sortBy, setSortBy] = useState(""); // State untuk filter pengurutan
  console.log(category, "test");
  useEffect(() => {
    if (categories) {
      // Cari kategori berdasarkan id
      const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(id, 10)
      );
      setCategory(selectedCategory);
    }
  }, [id, categories]);

  if (!category) {
    return <div>Loading...</div>;
  }

  const filterAndSortProducts = () => {
    let filteredProducts = category.categories.slice(); // Salin array untuk memastikan tidak mengubah array asli
  
    if (searchText) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  
    // Urutkan berdasarkan harga terendah
    filteredProducts.sort((a, b) => a.unitPrice - b.unitPrice);
  
    // Jika ada produk dengan harga yang sama, urutkan berdasarkan stok tersedikit
    filteredProducts.sort((a, b) => {
      if (a.unitPrice === b.unitPrice) {
        return a.stock - b.stock;
      }
      return 0;
    });
  
    return filteredProducts;
  };  

  const filteredAndSortedProducts = filterAndSortProducts();

  const hasProducts = category.categories && category.categories.length > 0;

  return (
    <div className="categotyListed">

    <div className="category-list-container">
      <img className="hero-image " src={category.image} alt={category.name} />
      <h2 className="category-title">{category.name}</h2>
      <ProductListContainer>
         {/* Filter Search */}
         <Filter>
         <SearchBar>
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchBar>
        {/* Filter Sort */}
        <SortFilter>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan berdasarkan</option>
            <option value="price">Harga Termurah sampai Termahal</option>
            <option value="stock">Stok Tersedikit sampai Terbanyak</option>
          </select>
        </SortFilter>
        </Filter>
        {hasProducts ? (
          <CardGridContainers>
            {filteredAndSortedProducts.map((product) => (
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                  <CardImage
                    src={product.image}
                    alt={product.name}
                    width="200"
                  />
                <CardContent>
                  <Title>
                    {product.name.split(" ").slice(0, 4).join(" ")}...
                  </Title>
                  <Price>Rp.{product.unitPrice.toLocaleString("id-ID")}</Price>
                  <div
                    style={{
                      width: "90px",
                      margin: "0",
                      padding: "5",
                      position: "relative",
                      left: "-30px",
                      top: "5px",
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
                </CardContent>
              </Card>
              </Link>
            ))}
          </CardGridContainers>
        ) : (
          <p>Produk belum tersedia dengan kategori ini</p>
        )}
      </ProductListContainer>
    </div>
    </div>
  );
};

export default CategoryDetail;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto; /* Mengisi seluruh tinggi viewport */
  margin: 0; /* Atur margin ke 0 untuk menghindari padding di sekitarnya */
  `;
  
  const SearchBar = styled.div`
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    width: 55%;
    input::placeholder {
      font-size: 9px; /* Reduced font size for 768px and below */
    }
  }
`;

const SortFilter = styled.div`
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 38%;
    select::placeholder {
      font-size: 9px; /* Reduced font size for placeholders */
    }
  }
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

const CardGridContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
  }
`;

const Card = styled.div`
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

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 5px 5px 0 0;
`;

const CardContent = styled.div`
  padding: 10px 10px 19px 10px;
  @media (max-width: 768px) {
    margin: 0;
    width: auto;
    padding: auto;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 7px;
`;

const Price = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  padding-top: 2px;
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: auto;
  @media (max-width: 768px) {
  }
`;
