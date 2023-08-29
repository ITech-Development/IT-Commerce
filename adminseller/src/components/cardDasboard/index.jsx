import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Card = ({ imageUrl, title, count }) => {
  const [visible, setVisible] = useState(false);

  const fadeIn = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <animated.div
      className="card-content"
      style={{
        ...fadeIn,
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "10px",
        margin: "0 20px",
      }}
    >
      <img
        src={imageUrl}
        alt=""
        className="card-image"
        width="200px"
        height="100px"
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 className={`total-${title.toLowerCase()}`}>{count} {title}</h4>
        <h2 className="card-title">Total {title}</h2>
      </div>
    </animated.div>
  );
};

const CardSection = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3100/admin-sellers/voucher");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3100/users/voucher", {
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
    <div
      className="card flex"
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        maxWidth: "1320px",
      }}
    >
      <Link to="/users">
        <Card
          imageUrl="https://e7.pngegg.com/pngimages/389/412/png-clipart-font-awesome-computer-icons-user-profile-users-group-blind-miscellaneous-blue.png"
          title="Users"
          count={Object.keys(users).length}
        />
      </Link>
      <Link to="/products">
        <Card
          imageUrl="https://image.pngaaa.com/123/2193123-middle.png"
          title="Products"
          count={products.length}
        />
      </Link>
      <Card
        imageUrl="https://png.pngtree.com/png-clipart/20210312/original/pngtree-simple-medal-of-honor-linear-icon-png-image_6074699.png"
        title="Points"
        count={0} // Replace with the actual value of points
      />
    </div>
  );
};

export default CardSection;
