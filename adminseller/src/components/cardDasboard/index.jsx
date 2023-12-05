import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OrderIcon from "../../assets/order.png";
import TransactionIcon from "../../assets/transaction-history.png";
// import Coin from "../../assets/coin.png";
import Packaging from './packaging.png'
import Delivery from './delivery.png'
import PackageReceived from './package-received.png'
import Pending from './payment.png'
import PaySuccess from './successful.png'

const CardContent = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 50px;
  margin: 0 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  transition: transform 0.2s;

  ${CardContent}:hover & {
    transform: scale(1.05);
  }
`;

// const TotalCount = styled.h4`
//   &.total-order {
//     color: #007bff;
//   }

//   &.total-transaction {
//     color: #28a745;
//   }
// `;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 0;
`;

const SmallImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: auto;
  justify-content: center;

  img {
    width: 24px; /* Ubah ukuran gambar kecil sesuai kebutuhan */
    height: 24px; /* Ubah ukuran gambar kecil sesuai kebutuhan */
    margin-right: 8px; /* Atur jarak antara gambar dan teks */
    display: flex;
    flex-direction: row;
  }

  p {
    margin: 0;
  }
`;
const SmallImageContainerPay = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: auto;
  justify-content: center;

  img {
    width: 24px; /* Ubah ukuran gambar kecil sesuai kebutuhan */
    height: 24px; /* Ubah ukuran gambar kecil sesuai kebutuhan */
    margin-right: 8px; /* Atur jarak antara gambar dan teks */
    display: flex;
    flex-direction: row;
  }

  p {
    margin: 0;
  }
`;

const Card = ({ imageUrl, title, count, to }) => {
  const [visible, setVisible] = useState(false);

  const fadeIn = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <CardContent style={{ ...fadeIn }}>
        <CardImage src={imageUrl} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <TotalCount className={`total-${title.toLowerCase()}`}>
            {count}
          </TotalCount> */}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardContent>
      {imageUrl === OrderIcon && (
        <div style={{ display: "flex", justifyContent: "center", padding: '15px' }}>
          <SmallImageContainer>
            <img src={Packaging} alt="" />
            <p>3</p>
          </SmallImageContainer>
          <SmallImageContainer>
            <img src={Delivery} alt="" />
            <p>50</p>
          </SmallImageContainer>
          <SmallImageContainer>
            <img src={PackageReceived} alt="" />
            <p>48</p>
          </SmallImageContainer>
        </div>
      )}
      {imageUrl === TransactionIcon && (
        <div style={{ display: "flex", justifyContent: "center", padding: '15px 30px' }}>
          <SmallImageContainerPay>
            <img src={Pending} alt="" />
            <p>3</p>
          </SmallImageContainerPay>
          <SmallImageContainerPay>
            <img src={PaySuccess} alt="" />
            <p>50</p>
          </SmallImageContainerPay>
        </div>
      )}
    </Link>
  );
};

const CardSection = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/transaction-list",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/order-list",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProducts();
    fetchUsers();
  }, []);

  return (
    <CardContainer>
      <Card
        imageUrl={OrderIcon}
        title="Pesanan Produk"
        count={Object.keys(users).length}
        to="/order-list"
      />
      <Link to="/product-list">
        <Card
          imageUrl="https://w7.pngwing.com/pngs/428/470/png-transparent-spare-part-computer-icons-aftersales-blue-text-logo-thumbnail.png"
          title="Total Products"
          count={products.length}
          width='200px'
        />
      </Link>
    </CardContainer>
  );
};

export default CardSection;
