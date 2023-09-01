import React, { useState } from "react";
import "./productSelect.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const styles = {
  cursorContainer: {
    position: "absolute",
    zIndex: 1,
    width: 25,
    height: 25,
    borderRadius: "50%",
    background: "#FFC500",
    pointerEvents: "none", // Make the cursor icon non-interactable
    transition: "transform 0.3s ease-in-out",
  },
  views: {
    textAlign: "center",
    background: "linear-gradient(45deg, #243A73, #3D83DB)",
    padding: "30px 20px",
    borderRadius: "20px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)", // Increased shadow for a stronger effect
  },
  h1: {
    color: "#FFFFFF",
    fontSize: "32px", // Increased font size for the main heading
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
  },
  h4: {
    color: "#FFFFFF",
    fontSize: "18px", // Increased font size for the subheading
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    marginBottom: "40px",
    maxWidth: "600px", // Limiting the width of the subheading to avoid stretching on larger screens
    margin: "0 auto", // Center the subheading horizontally
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    transform: "rotate(-5deg)",
    marginTop: "30px", // Add some space between the subheading and the button
    marginBottom: "10px",
  },
  "@keyframes moveButton": {
    "0%": {
      transform: "rotate(5deg) translateX(0)",
    },
    "50%": {
      transform: "rotate(10deg) translateX(10px)",
    },
    "100%": {
      transform: "rotate(5deg) translateX(0)",
    },
  },
  button: {
    padding: "18px 30px", // Increased padding for a larger button
    fontSize: "11px", // Increased font size for the button text
    fontWeight: "bold",
    borderRadius: "50px", // Increased border-radius for a rounder button
    background: "linear-gradient(45deg, #FF5C00, #FFC500)",
    color: "#FFFFFF",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.4)", // Increased shadow for a stronger effect
    transform: "rotate(5deg)",
    transition: "transform 0.2s ease-in-out", // Add a smooth transition effect on hover
    "&:hover": {
      animation: "$moveButton 0.5s ease-in-out",
    },
  },
};

export default function Index() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Function to update cursor position
  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div style={styles.views} onMouseMove={handleMouseMove}>
      {/* Floating cursor icon */}
      <div
        style={{
          ...styles.cursorContainer,
          transform: `translate(${cursorPosition.x - 12}px, ${
            cursorPosition.y - 12
          }px)`, // Position the cursor icon at the mouse position
        }}
      />
      <h1 style={styles.h1}>
        Belanja <br />
        Sekarang Juga!
      </h1>
      <h4 style={styles.h4}>
        Ingin mengakses produk yang tepat dari kategori yang disesuaikan?
      </h4>
      <div style={styles.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/productlist"
          style={styles.button}
        >
          Belanja & Dapatkan Promo Produk
        </Button>
      </div>
    </div>
  );
}
