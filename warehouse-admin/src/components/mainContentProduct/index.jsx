import React, { useState, useEffect } from "react";
import TableComponent from "../tableProduct";
import { Link } from "react-router-dom";
import ClaimVoucher from "../../assets/ClaimVouc.png";
import Modal from "react-modal";
import ChatbotIcon from "../../assets/chatbot.png";

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
          margin: "80px 40px 30px 40px",
          flexDirection: "column",
        }}
      >
        <h2>Dashboard Produk INDOTEKNIK</h2>
        <p>
          <strong>Catatan!</strong> Masukkan semua produk dengan BENAR
        </p>
        <div style={{ marginBottom: "30px" }}>
          <Link to="/add-product">
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
              Tambah Produk
            </button>
          </Link>
          <Link to="/dashboard-categories">
            <button style={{ marginBottom: "10px" }}>Dashboard Kategori</button>
          </Link>
          <Link to="/dashboard-types">
            <button>Dashboard Tipe</button>
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
        <img
          src={ClaimVoucher}
          alt="Product"
          style={{
            width: "90%",
          }}
        />
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
        onClick={() => setIsChatbotMessageVisible(!isChatbotMessageVisible)} // Toggle tampilan pesan chatbot saat ikon diklik
      />
    </>
  );
}

export default Index;
