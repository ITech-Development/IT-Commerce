import React, { useState } from "react";
import "./styleChat.css";

const ChatDash = () => {
  const [messageInput, setMessageInput] = useState("");

  const contacts = [
    {
      name: "evans",
      status: "Available",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "evansMoris",
      status: "Available",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "evansHendrik",
      status: "Available",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    // ... your send message logic ...
    setMessageInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-user-info">
        <div>
          <img
            style={{ width: "60px" }}
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />
          <h3>Username</h3>
        </div>
        <div className="chat-messages-container">

          <h3>Message</h3>
          <div className="clopmess">
          <div className="chat-messages">
            {contacts.map(
              (
                { name, status, img } // Tambahkan tanda kurung kurawal buka di sini
              ) => (
                <div
                  className={`chat-message ${
                    status === "Available" ? "" : "chat-right"
                  }`}
                  key={name}
                >
                  <img style={{ width: "60px" }} src={img} alt="" />
                  <h4>{name}</h4>
                  <p>{status}</p>
                  <hr />
                </div>
              )
            )}{" "}
            {/* Tambahkan tanda kurung kurawal tutup di sini */}
          </div>
        </div>
          </div>
      </div>
      <form className="chat-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>kanan</div>
    </div>
  );
};

export default ChatDash;
