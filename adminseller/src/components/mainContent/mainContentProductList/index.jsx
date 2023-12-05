import React, { useState, useEffect } from "react";
import TableComponent from "../../table/tableProductList";
import { Link } from "react-router-dom";
// import ClaimVoucher from "../../assets/ClaimVouc.png";
import Modal from "react-modal";
// import ChatbotIcon from "../../assets/chatbot.png";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <main
        style={{
          display: "flex",
          margin: "0px 20px 15px 20px",
          flexDirection: "column",
        }}
      >
        <h2>Dashboard Produk INDOTEKNIK</h2>

        <div style={{ marginBottom: "30px" }}>
          <Link to="/">
            <button
              style={{
                padding: "10px 20px",
                background: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Dashboard
            </button>
          </Link>
          
        </div>
        <TableComponent />
      </main>
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
        
      </Modal>
      {/* Tampilkan pesan sapaan dari chatbot */}
      {isChatbotMessageVisible && (
        <div
          id="chatbot-message"
          style={{
            position: "fixed",
            bottom: "130px", // Sesuaikan posisi pesan chatbot dengan modal
            right: "20px",
            width: "200px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 9999,
            animation: "slideInFromBottom 1s ease-in-out", // Animasi
          }}
        >
          Hello, Selamat datang di Indoteknik
        </div>
      )}
      
    </>
  );
}

export default Index;