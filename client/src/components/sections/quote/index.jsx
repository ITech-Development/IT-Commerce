import React from "react";
import WomanDiscussion from "../../../assets/wowanDiscussion.png";

export default function index() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          maxWidth: "1220px",
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "50px",
          }}
        >
          <div>
            <h1 style={{ color: "#010F52" }}>
              Melangkah maju ke era digital praktis
              <br />
              <span
                style={{
                  maxWidth: "700px",
                  color: "#243A73",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {" "}
                Siap berpikir Cerdas tentang Produk global Berkualitas?.
              </span>
            </h1>

            <p style={{ maxWidth: "700px" }}>
              AI sourcing technology and procurement expertise deliver
              rawmaterila or orders products to customers with befitical offers
              AI sourcing technology and procurement expertise deliver
              rawmaterila or orders products to customers with befitical offers
            </p>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <button
              className="btn"
              style={{
                padding: "20px  50px",
                cursor: "pointer",
                backgroundColor: "#243A73",
                color: "white",
                border: "1px solid #243A73",
                borderRadius: "10px",
              }}
            >
              Baca Selengkapnya
            </button>
          </div>
        </div>
        <img src={WomanDiscussion} alt="" />
      </div>
    </>
  );
}
