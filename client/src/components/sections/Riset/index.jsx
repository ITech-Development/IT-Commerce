import React from "react";
import "./riset.css";
import CardItems from "./cardItems";

export default function index() {
  return (
    <div
      className="riset"
      style={{ maxWidth: "100%", padding: "0 20px", textAlign: "center" }}
    >
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          color: "#333",
          display: "flex",
          marginBottom: "10px",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        Riset .Solusi .Eksekusi .Pemenuhan
        <br />
        <span style={{ fontSize: "18px" }}>
          Kami bekerja dengan teknologi dan keahlian: Memberikan Hasil yang
          memuaskan.
        </span>
      </h1>
      <CardItems />
    </div>
  );
}
