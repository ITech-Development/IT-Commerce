import React from "react";
import { useGetProductCategoriesQuery } from "../../features/product/apiProducts";
import { Link } from "react-router-dom";
import "./catList.css";
import AllProduct from "../../components/produkTerlaris";

const CategoryList = () => {
  const { data, error, isLoading } = useGetProductCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="categotyListed">
      <div className="category-list-container">
        <img
          className="hero-image"
          src="https://res.cloudinary.com/dcbryptkx/image/upload/v1697853515/IndoTeknikMarketplace/product/banner/Banner%20Page%20All%20Kategori/Banner_All_Kategori_jcse02.png"
          alt=""
        />
        <h2 className="category-title">Kategori Produk</h2>
        <div className="category-grid">
          {data.slice(0, 10).map((category) => (
            <div className="category-item" key={category.id}>
              <Link to={`/category-list/${category.id}`}>{category.name}</Link>
            </div>
          ))}
        </div>
      </div>
      <AllProduct className="productCat" />
    </div>
  );
};

export default CategoryList;
