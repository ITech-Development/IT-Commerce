/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import HeroSection from "../../components/sections/hero";
import Footer from "../../components/footer";
import ProductCategories from "../../components/sections/productCategories";
import ClaimVoucher from "../../assets/ClaimVouc.png";
import { Link } from "react-router-dom";
import CorouselBrands from "../../components/sections/corouselBrands";
import "./stl.css";
import ChatbotIcon from "../../assets/chatbot.png";
import ProdukTerlaris from "../../components/produkTerlaris";
import FlashSale from "../../components/flashSale";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isChatbotMessageVisible, setIsChatbotMessageVisible] = useState(false);

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("modalShown");

    if (!hasModalBeenShown) {
      setIsModalOpen(true);

      localStorage.setItem("modalShown", "true");
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    setOffsetY(e.clientY - e.target.getBoundingClientRect().top);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const chatbotIcon = document.getElementById("chatbot-icon");
      if (chatbotIcon) {
        chatbotIcon.style.left = e.clientX - offsetX + "px";
        chatbotIcon.style.top = e.clientY - offsetY + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offsetX, offsetY]);

  return (
    <>
      <div className="herohome">
        <HeroSection />
        <CorouselBrands />
        <ProductCategories />
        <FlashSale />
        <h1 className="productlaris">Produk Terlaris</h1>
        <ProdukTerlaris />
        <Footer />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Product Image"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            maxWidth: "37%",
            margin: "auto",
            position: "relative",
            top: "100px",
            background: "none",
            border: "none",
          },
        }}
      >
        <Link to="/productlist">
          <img
            src={ClaimVoucher}
            alt="Product"
            style={{
              width: "90%",
            }}
          />
        </Link>
      </Modal>
      {isChatbotMessageVisible && (
        <div
          id="chatbot-message"
          style={{
            position: "fixed",
            bottom: "130px",
            right: "20px",
            width: "200px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 9999,
            animation: "slideInFromBottom 1s ease-in-out",
          }}
        >
          Hello, Selamat datang di Indoteknik
        </div>
      )}
      <img
        id="chatbot-icon"
        src={ChatbotIcon}
        alt="Chatbot"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "100px",
          cursor: "pointer",
        }}
        onClick={() => setIsChatbotMessageVisible(!isChatbotMessageVisible)}
      />
    </>
  );
}

export default Index;