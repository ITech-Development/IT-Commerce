import React, { useState } from "react";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Corousel from '../../components/corousel/services'

import "../../App.css";
// import Hero from "../../assets/bannerproduct1.jpg";




const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  width: "100%",
};

const searchInputStyle = {
  padding: "8px",
  height: "30px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "10px",
  flex: 1,
};

const sortSelectStyle = {
  padding: "8px",
  height: "48px",
  fontWeight: "500",
  borderRadius: "4px",
  border: "1px solid #ccc",
  minWidth: "200px",
};

const ProductList = () => {
  const { error, isLoading } = useGetAllProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };


  return (
    <>
        <Corousel/>

      <div >
        {/* <img src={Hero} alt="" /> */}
        <div className="productlist-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>An error occurred</p>
          ) : (
            <>
              <h2 style={{ margin: "30px 0 20px 0", textAlign: "start" }}>
                Semua Servis
              </h2>
              <div style={searchContainerStyle}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  style={searchInputStyle}
                  placeholder="Cari Servis Berdasarkan Nama..."
                />
                <select
                  value={sortOption}
                  onChange={handleSortOptionChange}
                  style={sortSelectStyle}
                >
                  <option value="name">Berdasarkan Nama</option>
                  <option value="price">Harga Terendah - Tertinggi</option>
                  <option value="stock">Stok Paling Sedikit - Terbanyak</option>
                </select>
              </div>
              <div className="products">
                <h2>Under Development</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
