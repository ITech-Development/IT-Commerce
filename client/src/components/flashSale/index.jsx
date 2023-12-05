// src/components/FlashSale.js
import React, { useEffect, useState } from 'react';
import './flashSale.css';
import { FadeLoader } from 'react-spinners';
import styled, { keyframes } from 'styled-components';
import { useGetAllEventProductsQuery } from '../../features/eventProduct/apiEventProducts';

const FlashSale = () => {

  const initialProductCount = 2; // Number of products to display initially
  const [visibleProducts, setVisibleProducts] = useState(initialProductCount);

  const handleLoadMore = () => {
    // Increase the number of visible products on "Load More" click
    setVisibleProducts((prevCount) => prevCount + 4); // You can adjust the increment as needed
  };

  // const { data: products, error, isLoading } = useGetProductsQuery();
  const { data: eventProducts, error, isLoading } = useGetAllEventProductsQuery()
  // console.log(eventProducts,'test');

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Format today's date as 'YYYY-MM-DD'

  // Filter event products for today
  const todayEventProducts = eventProducts?.filter(
    (product) => product.events.name === 'Today' && product.createdAt.split('T')[0] === formattedToday
  );

  // Display only a subset of today's event products
  const visibleTodayProducts = todayEventProducts?.slice(0, visibleProducts);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0); // End of today
    const timeDiff = endOfDay - today;
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Stop interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);


  console.log('test', visibleTodayProducts);
  return (
    <div className="flash-sale-container">
      <h2>Flash Sale</h2>
      <p>
            Today's flash sale berakhir dalam: {timeRemaining.hours} hours, {timeRemaining.minutes} minutes, {timeRemaining.seconds} seconds
          </p>
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
          
          {visibleTodayProducts?.map((product) => (
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
            <LoadMoreButton onClick={handleLoadMore}>Muat lebih banyak</LoadMoreButton>
          )}
        </div>
      )}

    </div>
  );
};


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

export default FlashSale;
