import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../App.css";

const API_URL = "http://localhost:3100";

const linkStyle = {
    color: "white",
    textDecoration: "none",
};

const ProductCard = ({ product, onAddToCart }) => {
    const originalPrice = product.unitPrice;
    const discountAmount = originalPrice * 0.03;
    const discountedPrice = originalPrice - discountAmount;

    return (
        <div className="product">
            <a
                href={`/products/${product.id}`}
                className="view-product-button"
                style={linkStyle}
            >
                <img src={`${API_URL}/${product.image}`} alt={product.name} />
            </a>
            <div className="details">
                <h3>{product.category}</h3>
                <p>{product.name}</p>
                <span className="price">{originalPrice}</span>
                <br />
                <span className="price">
                    <i>3% <del>{discountedPrice}</del></i>
                </span>
                <p>Stock: {product.stock}</p>
            </div>
            <button
                className="add-to-cart-button"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
};

const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("name");
    const [categoryOne, setCategoryOne] = useState([]);

    useEffect(() => {
        getCategoryOne();
    }, []);

    const getCategoryOne = async () => {
        try {
            const response = await axios.get(`${API_URL}/products/ve-pump-parts`);
            const jsonData = response.data;
            setCategoryOne(Array.isArray(jsonData) ? jsonData : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddToCart = async (product) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            const url = `${API_URL}/product-carts`;
            try {
                const response = await axios.post(url, product, {
                    headers: { access_token: accessToken },
                });
                console.log(response.data, " ???Asdas");
                // dispatch(addToCart(product));
                // navigate('/cart');
            } catch (err) {
                console.log("asdsad");
            }
        } else {
            alert("Login dulu dong");
            // navigate("/login");
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    // const filteredAndSortedData = categoryOne
    //     .filter((product) =>
    //         product.name.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //     .sort((a, b) => {
    //         switch (sortOption) {
    //             case "price":
    //                 return a.unitPrice - b.unitPrice;
    //             case "stock":
    //                 return a.stock - b.stock;
    //             default:
    //                 // Sort by name by default
    //                 return a.name.localeCompare(b.name);
    //         }
    //     });

    return (
        <>
             <img
        style={{
          maxHeight: "1420px",
          display: "flex",
          margin: "60px 0 0 0",
          width: "100%",
        }}
        src="https://res.cloudinary.com/dcbryptkx/image/upload/v1692322039/IndoTeknikMarketplace/product/banner/Banner%20Kategori/VE_Pump_Part_hvtytp.jpg"
        alt=""
      />
      <div className="productlist-container">
        <h2 style={{ margin: "40px 0 20px 0", textAlign: "start" }}>
          VE Pump Parts
        </h2>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{ padding: "8px", height: "30px", borderRadius: "4px", border: "1px solid #ccc", marginRight: "10px", flex: 1 }}
                        placeholder="Cari Produk Berdasarkan Nama..."
                    />
                    <select
                        value={sortOption}
                        onChange={handleSortOptionChange}
                        style={{ padding: "8px", height: "48px", fontWeight: "500", borderRadius: "4px", border: "1px solid #ccc", minWidth: "200px" }}
                    >
                        <option value="name">Berdasarkan Nama</option>
                        <option value="price">Harga Terendah - Tertinggi</option>
                        <option value="stock">Stok Paling Sedikit - Terbanyak</option>
                    </select>
                </div>

                <div className="products">
                    {categoryOne.length === 0 ? (
                        <p>Dalam kategori yang anda pilih produk belum tersedia</p>
                    ) : (

                        categoryOne.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))

                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
