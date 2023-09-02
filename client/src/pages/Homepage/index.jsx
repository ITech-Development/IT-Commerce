import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import HeroSection from "../../components/sections/hero";
import Footer from "../../components/footer";
import ProductCatgories from "../../components/sections/productCategories";
import ClaimVoucher from "../../assets/popup.png";
import { Link } from "react-router-dom";
import CorouselBrands from "../../components/sections/corouselBrands";
import { Chatbot } from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <div style={{ position: "relative", top: "60px" }}>
        <HeroSection />
        <CorouselBrands />
        <ProductCatgories />
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
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "8px",
            right: "-6px",
            background: "gray",
            cursor: "pointer",
            fontSize: "30px",
            color: "white",
            border: "1px solid gray",
            borderRadius: "50%",
            padding: "0 8px",
          }}
        >
          &times;
        </button>
        <Link to="/productlist">
          <img
            src={ClaimVoucher}
            alt="Product"
            style={{
              width: "100%",
            }}
          />
        </Link>
      </Modal>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </>
  );
}

export default Index;
