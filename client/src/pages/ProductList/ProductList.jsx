import "../../App.css";
import { useGetAllProductsQuery } from "../../features/productsApi";
import Hero from "../../components/sections/heroProductList";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
      <Hero />
      <div className="productlist-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          <>
            <h2>Produk Rekomendasi</h2>
            <div className="products">
              {data && data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.category}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <p>{product.name}</p>
                    <span className="price">Rp.{product.price}</span>
                  </div>
                  <button
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      backgroundColor: "#4b70e2",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      color: "white",
                      letterSpacing: "1.1",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
