import React, { useState, useEffect, useRef } from "react";
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
import Mascotmes from "../../assets/mascotmes.gif";
import EmojiPicker from "./emoji";

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatbotMessageVisible, setIsChatbotMessageVisible] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("home");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const inputRef = useRef(null); // Referensi ke elemen input

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setIsEmojiPickerVisible(false); // Close the emoji picker after selection
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
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

  const [messages, setMessages] = useState([
    {
      text: "Halo! Selamat datang di pasar Indo-Teknik! Saya Donik, asisten AI andalan Anda. Toko kami adalah destinasi lengkap untuk semua kebutuhan otomotif Anda, buka dari pukul 08:00 hingga 17:30 WIB, Senin hingga Sabtu. Tapi santai saja, jika saat ini di luar jam operasional, bersabarlah sebentar, dan admin kami akan segera menjawab Anda.",
      type: "received",
    },
    // { text: "Try to type", type: "sent" },
    // { text: "Enjoy!", type: "received" },
  ]);

  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleThumbClick = () => {
    // Kirim pesan dengan teks yang sudah ada di inputText ketika ikon thumb diklik
    if (inputText.trim() !== "") {
      handleSubmit(new Event("click"));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputText.trim() !== "") {
  //     setMessages([...messages, { text: inputText, type: "sent" }]);
  //     setInputText("");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      // Include the selected emoji in the message if one is selected
      const messageText = selectedEmoji
        ? `${inputText} ${selectedEmoji}`
        : inputText;
      setMessages([...messages, { text: messageText, type: "sent" }]);
      setInputText("");
      setSelectedEmoji(null); // Reset selected emoji
    }
  };

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
          }}
        >
          <div className="content">
            <div className="questionList">
              {activeContent === "home" && (
                <div>
                  <div style={{ padding: "20px", lineHeight: "29px" }}>
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
                          Konten 1<i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 2<i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 3<i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 4<i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 5<i class="fa fa-caret-right"></i>
                        </button>
                        <button id="kontenLayarUtamaButton" class="buttons">
                          Konten 6<i class="fa fa-caret-right"></i>
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
                    <div style={{ lineHeight: "9px", textAlign: "center" }}>
                      <h3 style={{ color: "white" }}>Customer Service</h3>
                      <img className="peoplesBot" src={PeopleBot} alt="" />
                    </div>
                    <h4 className="subHEadChatbot">
                      Kami biasanya membalas pada pukul 08.00 - 17.30 WIB{" "}
                    </h4>
                  </div>

                  <div className="messageConcep">
                    <div>
                      <div className="screen">
                        <div className="conversation">
                          {messages.map((message, index) => (
                            <div
                              className={`messages messages--${message.type}`}
                              key={index}
                            >
                              {message.type === "received" && (
                                <img
                                  className="giftMascot"
                                  src={Mascotmes}
                                  alt="Mascot Icon"
                                />
                              )}
                              <div className="message">{message.text}</div>
                            </div>
                          ))}
                        </div>
                        {/* Chat input */}
                        <div className="text-bar">
                          <form
                            className="text-bar__field"
                            onSubmit={handleSubmit}
                          >
                            <input
                              type="text"
                              ref={inputRef} // Menghubungkan referensi ke elemen input
                              placeholder="Ketik Pesan"
                              value={inputText}
                              onChange={handleInputChange}
                            />
                            {selectedEmoji && (
                              <span className="selected-emoji">
                                {selectedEmoji}
                              </span>
                            )}
                            <button
                              style={{ cursor: "pointer" }}
                              type="button"
                              className="emoji-picker-button"
                              onClick={() => {
                                toggleEmojiPicker();
                                inputRef.current.focus(); // Fokus ke elemen input ketika ikon emoji diklik
                              }}
                            >
                              Emoji
                            </button>
                          </form>
                          <div className="text-bar__thumb">
                            <img
                              className="thumb"
                              src="data:image/png;base64,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"
                              alt=""
                              onClick={handleThumbClick}
                            />
                          </div>
                        </div>

                        {/* Emoji Picker */}
                        {isEmojiPickerVisible && (
                          <EmojiPicker onSelect={handleEmojiSelect} />
                        )}
                      </div>
                    </div>
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
