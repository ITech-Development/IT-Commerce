import React from "react";
import {
  useGetWishlistsQuery,
  useRemoveWishlistMutation,
} from "../../features/wishlist/apiWishlist";
import { Link } from "react-router-dom";
import "./wishlist.css";
import styled from "styled-components";
import Back from '../../assets/back-button.png';

function Wishlist() {
  // Menggunakan hook useGetWishlistsQuery untuk mengambil daftar wishlist dari API
  const { data: wishlists, isError, isLoading } = useGetWishlistsQuery();
  const [removeWishlist] = useRemoveWishlistMutation();

  if (isLoading) {
    return <div>Sedang memuat...</div>;
  }

  if (isError) {
    return <div>Terjadi kesalahan saat mengambil data wishlist.</div>;
  }

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      // Call the removeWishlist mutation with the wishlist ID
      await removeWishlist(wishlistId);
    } catch (error) {
      console.error("Error removing item from wishlist", error);
    }
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page in the browsing history
  };

  return (
    <>
    
        <div>
        <Link className="backCheckTrans" onClick={handleGoBack}>
          <img className="back" src={Back} alt="Back" />
          <h3 className="cartTitle">Kembali</h3>
        </Link>
      </div>
    <div className="prdtwsl">
      <h2 className="titleTers">Produk Wishlist</h2>
      <CardGridContainers>
        {wishlists.map((wishlist) => (
            <Card key={wishlist.id}>
            <Link
              to={`${wishlist.product.id}`}
              style={{ textDecoration: "none" }}
              >
              <br />
              <CardImage
                src={wishlist.product.image}
                alt={wishlist.product.name}
                />
              <CardContent>
                <Title>{wishlist.product.name.split(" ").slice(0, 6).join(" ")}...</Title>
                <Price>Rp. {wishlist.product.unitPrice}</Price>
              </CardContent>
            </Link>
            <button
              className="muats"
              onClick={() => handleRemoveFromWishlist(wishlist.id)}
            >
              Hapus
            </button>
          </Card>
        ))}
      </CardGridContainers>
    </div>
  </>
  );
}

export default Wishlist;

const CardGridContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  text-decoration: none;
  @media (max-width: 768px) {
      display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    padding: 0;
  }
`;

const Card = styled.div`
  // padding: 0 10px 19px 10px;
  // max-height: 282px;
  height: auto;
  width: auto;
  box-shadow: none;

  @media (max-width: 768px) {
    margin-top: -10px;
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
