import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import HeroSection from "../../components/sections/hero";
import Footer from "../../components/footer";
import ProductCategories from "../../components/sections/productCategories";
import ClaimVoucher from "../../assets/ClaimVouc.png";
import CorouselBrands from "../../components/sections/corouselBrands";
import "./stl.css";
import ChatbotIcon from "../../assets/chatbot.png";
import ProdukTerlaris from "../../components/produkTerlaris";
import PeopleBot from "../../assets/PeopleBot.png";
import Hand from "../../assets/Handd.png";
import Home from "../../assets/home.png";
import Help from "../../assets/help.png";
import Message from "../../assets/message.png";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const [offsetX, setOffsetX] = useState(0);
  // const [offsetY, setOffsetY] = useState(0);
  const [isChatbotMessageVisible, setIsChatbotMessageVisible] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("home");

  // const contentExamples = {
  //   home: {
  //     title: "Layar Utama",
  //     content: "Ini adalah konten untuk Layar Utama.",
  //   },
  //   help: {
  //     title: "Bantuan",
  //     content: "Ini adalah konten untuk Bantuan.",
  //   },
  //   message: {
  //     title: "Pesan",
  //     content: "Ini adalah konten untuk Pesan.",
  //   },
  // };

  // const openChatbotModal = () => {
  //   setIsChatbotModalOpen(true);
  // };

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

  // const handleMouseDown = (e) => {
  //   setIsDragging(true);
  //   setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
  //   setOffsetY(e.clientY - e.target.getBoundingClientRect().top);
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     if (!isDragging) return;

  //     const chatbotIcon = document.getElementById("chatbot-icon");
  //     if (chatbotIcon) {
  //       chatbotIcon.style.left = e.clientX - offsetX + "px";
  //       chatbotIcon.style.top = e.clientY - offsetY + "px";
  //     }
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("mouseup", handleMouseUp);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [isDragging, offsetX, offsetY]);

  // const renderChatbotContent = () => {
  //   const exampleContent = contentExamples[activeContent];

  //   if (exampleContent) {
  //     return (
  //       <div style={{ padding: "10px 20px" }}>
  //         <img className="peopleBot" src={PeopleBot} alt="" />
  //         <div className="headBot">
  //           <h2 style={{ color: "white" }}>
  //             <span style={{ color: "#CABAEA" }}>Hai</span> <br /> Bagaimana
  //             kami dapat membantu?
  //           </h2>
  //           <img className="hand" src={Hand} alt="" />
  //         </div>
  //         <div className="questionList">
  //           <p>{exampleContent.title}</p>
  //           <p>{exampleContent.content}</p>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

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

      {/* Modal sebelumnya */}
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

      <Modal
        isOpen={isChatbotModalOpen}
        onRequestClose={closeChatbotModal}
        contentLabel="Chatbot Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            maxWidth: "50%",
            margin: "auto",
            background: "#fff",
            border: "none",
          },
        }}
      >
        {/* Konten modal card chatbot Anda di sini */}
        {/* {renderChatbotContent()} */}
        <button onClick={closeChatbotModal}>Tutup Modal</button>
      </Modal>

      {/* Chatbot message dengan animasi */}
      {isChatbotMessageVisible && (
        <div
          className={`boxbot ${isChatbotMessageVisible ? "show" : "hide"}`}
          id="chatbot-message"
          style={{
            position: "fixed",
            bottom: "130px",
            top: "9px",
            maxheight: "auto",
            right: "26px",
            width: "340px",
            border: "0.3px solid white",
            borderRadius: "15px",
            zIndex: 9999,
            // overflow: "scroll",
          }}
        >
          {/* <div className="container"> */}
          <div className="content">
            <div className="questionList">
              {activeContent === "home" && (
                <div>
                  <div style={{padding: '20px', lineHeight: '29px'}}>
                    <img className="peopleBot" src={PeopleBot} alt="" />
                    <div className="headBot">
                      <h2 style={{ color: "white" }}>
                        <span style={{ color: "#CABAEA" }}>Hai</span> <br />{" "}
                        Bagaimana kami dapat membantu?
                      </h2>
                      <img className="hand" src={Hand} alt="" />
                    </div>
                  </div>
                  <div className="qna">
                    <div style={{ maxHeight: "245px" }}>
                      <div class="select-button">
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 1
                          <i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 2
                          <i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 3
                          <i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 4
                          <i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 5
                          <i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 6
                          <i class="fa fa-caret-right"></i>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeContent === "help" && (
                <div className="helpConcep">
                  <h3 style={{ textAlign: "center", color: "white" }}>
                    Bantuan
                  </h3>
                  <div class="search-container">
                    <input
                      className="dropSearch"
                      type="text"
                      placeholder="Cari bantuan"
                    />
                  </div>
                  <div className="helpContent" style={{ margin: 0 }}>
                    <strong>18 Collections</strong>
                  </div>
                </div>
              )}
              {activeContent === "message" && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div style={{lineHeight: '9px', textAlign: 'center'}}>

                    <h3 style={{ color: "white" }}>Customer Service</h3>
                    <img className="peoplesBot" src={PeopleBot} alt="" />
                    </div>
                    <h3 className="subHEadChatbot">Kami biasanya membalas pada pukul 08.00 WIB - 17.30 WIB </h3>
                  </div>

                  <div className="messageConcep">
                    <p>Konten untuk Pesan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="conbut">
            <div className="ParBut">
              <div className="chilBut" onClick={() => setActiveContent("home")}>
                <img className="butSec" src={Home} alt="" />
                <p>Layar utama</p>
              </div>
              <div className="chilBut" onClick={() => setActiveContent("help")}>
                <img className="butSec" src={Help} alt="" />
                <p>Bantuan</p>
              </div>
              <div
                className="chilBut"
                onClick={() => setActiveContent("message")}
              >
                <img className="butSec" src={Message} alt="" />
                <p>Pesan</p>
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}

      <img
        id="chatbot-icon"
        src={ChatbotIcon}
        alt="Chatbot"
        style={{
          position: "fixed",
          bottom: "10px",
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
