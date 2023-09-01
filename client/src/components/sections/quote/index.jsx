import React from "react";
import WomanDiscussion from "../../../assets/wowanDiscussion.png";

export default function Index() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "700px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#010F52" }}>
          Melangkah maju ke era digital praktis
          <br />
          <span
            style={{
              color: "#243A73",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            Siap berpikir Cerdas tentang Produk global Berkualitas?.
          </span>
        </h1>

        <p>
          AI sourcing technology and procurement expertise deliver raw materials
          or ordered products to customers with beneficial offers. AI sourcing
          technology and procurement expertise deliver raw materials or ordered
          products to customers with beneficial offers.
        </p>

        <button
          className="btn"
          style={{
            padding: "12px 24px",
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
      <img
        src={WomanDiscussion}
        alt=""
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
