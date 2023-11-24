// src/components/FlashSale.js
import React, { useEffect, useState } from 'react';
import './flashSale.css';
import { useGetProductsQuery } from '../../features/product/apiProducts';
import { FadeLoader } from 'react-spinners';
import styled, { keyframes } from 'styled-components';
import { useGetAllEventProductsQuery } from '../../features/eventProduct/apiEventProducts';

const FlashSale = () => {

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  };

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

  const Card = styled.div`
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s ease;
        max-height: 330px;
        max-width: 300px; /* Atur lebar maksimum sesuai kebutuhan Anda */
        width: 100%; /* Gunakan lebar 100% agar sesuai dengan wadahnya */
      
        &:hover {
          animation: ${shadowAnimation} 1s ease-in-out infinite;
        }
      `;

  const CardImage = styled.img`
        width: 100%;
        height: auto;
        object-fit: cover;
      `;

  const CardContent = styled.div`
        padding: 16px;
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
        max-width: 1420px;
        margin: 0 auto;
        padding: 20px; /* Atur sesuai kebutuhan Anda */
        @media (max-width: 768px) {
          position: relative;
          top: -220px;
        }
      `;

  const LoadMoreButton = styled.button`
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      
        &:hover {
          background-color: #0056b3;
        }
      `;

  const CardGridContainers = styled.div`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 20px;
        @media (max-width: 768px) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      `;

  const initialProductCount = 2; // Number of products to display initially
  const [visibleProducts, setVisibleProducts] = useState(initialProductCount);

  const handleLoadMore = () => {
    // Increase the number of visible products on "Load More" click
    setVisibleProducts((prevCount) => prevCount + 4); // You can adjust the increment as needed
  };


  const [timer, setTimer] = useState({
    hours: 12,
    minutes: 5, // durasi timer dalam menit
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(interval);
      } else {
        if (timer.minutes === 0 && timer.seconds === 0) {
          setTimer({
            hours: timer.hours - 1,
            minutes: 59,
            seconds: 59,
          });
        } else if (timer.seconds === 0) {
          setTimer({
            hours: timer.hours,
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        } else {
          setTimer({
            hours: timer.hours,
            minutes: timer.minutes,
            seconds: timer.seconds - 1,
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const displayTimer = `${formatTime(timer.hours)}:${formatTime(
    timer.minutes
  )}:${formatTime(timer.seconds)}`;

  // const { data: products } = useGetProductsQuery()


  //   const products = [
  //     { id: 1, name: 'Product 1', price: 19.99, discount: 10 },
  //     { id: 2, name: 'Product 2', price: 29.99, discount: 15 },
  //     // Tambahkan produk lainnya
  //   ];

  // const { data: products, error, isLoading } = useGetProductsQuery();
  const { data: eventProducts, error, isLoading } = useGetAllEventProductsQuery()
    // console.log(eventProducts,'test');

  return (
    <div className="flash-sale-container">
      <h2>Flash Sale</h2>
      <p className="timer">Time Remaining: {displayTimer}</p>
      <a href="/event-products">
        <p>Lihat Semua</p>
      </a>
      {isLoading ? (
        <div style={loadingContainerStyle}>
          <FadeLoader color="#007bff" loading={isLoading} size={50} />
        </div>
      ) : error ? (
        <p>An error occurred</p>
      ) : (
        <div className="product-container">
          {eventProducts?.slice(0, visibleProducts).map((product) => (
            <Card key={product.id}>
              <a href={`/products/${product.id}`}>
                <CardImage src={product.eventProducts.image} alt={product.eventProducts.name} />
              </a>
              <CardContent>
                <Title>{product.eventProducts.name.split(' ').slice(0, 4).join(' ')}...</Title>
                <Price>Rp.{product.eventProducts.unitPrice.toLocaleString('id-ID')}</Price>
                {/* Add your star rating and other details if needed */}
                {/* <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button> */}
              </CardContent>
            </Card>
          ))}
          {visibleProducts < eventProducts?.length && (
            <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
          )}
        </div>
      )}

    </div>
  );
};

export default FlashSale;
