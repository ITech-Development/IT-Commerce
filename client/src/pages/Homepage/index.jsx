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

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isChatbotMessageVisible, setIsChatbotMessageVisible] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  const openChatbotModal = () => {
    setIsChatbotModalOpen(true);
  };
  
  const closeChatbotModal = () => {
    setIsChatbotModalOpen(false);
  };
  

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
            top: '10px',
            right: "26px",
            width: "300px",
            backgroundColor: "blue",
            border: "1px solid blue",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 9999,
            animation: "slideInFromBottom 1s ease-in-out",
          }}
        >
          <h2 style={{color: 'white'}}><span>Hai</span> <br/> Bagaimana kami dapat membantu?</h2>
          <div style={{background: 'white', border: '1px solid', borderRadius: '5px', padding: '10px'}}>
            <p>Cari bantuan</p>
            <p>Dapatkah Anda membantu saya menemukan suku cadang khusus untuk mobil saya?</p>
          </div>
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
          width: "70px",
          cursor: "pointer",
        }}
        onClick={() => setIsChatbotMessageVisible(!isChatbotMessageVisible)}
      />
    </>
  );
}

export default Index;