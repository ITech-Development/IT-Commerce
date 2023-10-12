import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContent = styled(animated.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  margin: 0 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 200px;
  height: 100px;
  transition: transform 0.2s;

  ${CardContent}:hover & {
    transform: scale(1.05);
  }
`;

const TotalCount = styled.h4`
  &.total-order {
    color: blue;
  }

  &.total-transaction {
    color: green;
  }
`;

const CardTitle = styled.h2`
  font-size: 18px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 1320px;
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
          <TotalCount className={`total-${title.toLowerCase()}`}>
            {count} {title}
          </TotalCount>
          <CardTitle>Total {title}</CardTitle>
        </div>
      </CardContent>
    </Link>
  );
};

const CardSection = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/transaction-list", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        
        const response = await axios.get("https://indoteknikserver-732012365989.herokuapp.com/admin-sellers/order-list", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
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
      <Link to="/order-list">
        <Card
          imageUrl="https://e7.pngegg.com/pngimages/389/412/png-clipart-font-awesome-computer-icons-user-profile-users-group-blind-miscellaneous-blue.png"
          title="Order List"
          count={Object.keys(users).length}
        />
      </Link>
      <Link to="/transaction-list">
        <Card
          imageUrl="https://image.pngaaa.com/123/2193123-middle.png"
          title="Transaction List"
          count={products.length}
        />
      </Link>
      <Card
        imageUrl="https://png.pngtree.com/png-clipart/20210312/original/pngtree-simple-medal-of-honor-linear-icon-png-image_6074699.png"
        title="Points"
        count={0}
        to="/points"
      />
    </CardContainer>
  );
};

export default CardSection;
