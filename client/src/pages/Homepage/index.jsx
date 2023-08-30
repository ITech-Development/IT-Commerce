import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import HeroSection from "../../components/sections/hero";
// import CommitQuote from "../../components/sections/commited";
// import ProductSelected from "../../components/sections/productSelect";
// import Riset from "../../components/sections/Riset";
// import AdminProf from "../../components/sections/adminProf";
// import Quote from "../../components/sections/quote";
import Footer from "../../components/footer";
import ProductCatgories from "../../components/sections/productCategories";
import ClaimVoucher from "../../assets/popup.png";
import { Link } from "react-router-dom";
// import ProductEvent from '../../components/sections/BrandSales/Product'

// Import Chatbot components from react-chatbot-kit
import { Chatbot } from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
   // Function to open the modal
   const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restore the scroll on the body
  };
  // useEffect to open the modal on component mount
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <div style={{ position: "relative", top: "60px" }}>
        {/* <Navbar/> */}
        <HeroSection />
        <ProductCatgories/>
        {/* <ProductEvent/> */}
        {/* <CommitQuote />
        <ProductSelected onClick={openModal} /> {/* Added onClick event */}
        {/* <Riset />
        <AdminProf />
        <Quote /> */}
        {/* <ComeRegis/> */}
        {/* <Service/> */}
        <Footer />
      </div>

      {/* Modal for Image */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Product Image"
        
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            maxWidth: "37%", // Adjust the width of the modal here
            margin: "auto",
            position: "relative",
            top: '100px',
            background: 'none',
            border: 'none',
            },
        }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "8px",
            right: "-6px",
            background: "gray",
            // border: "none",
            cursor: "pointer",
            fontSize: "30px",
            color: "white",
            border: '1px solid gray',
            borderRadius: "50%",
            padding: '0 8px'
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

      {/* Add the Chatbot component */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </>
  );
}

export default Index;
