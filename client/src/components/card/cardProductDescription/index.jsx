import React from "react";

export default function CardProductDescription({ description }) {
  return (
    <div
      style={{
        width: "600px",
        border: "1px solid gray",
        borderRadius: "5px",
        // margin: "0",
        marginBottom: "30px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>DENSO NO :</p>
          <p>Specification :</p>
        </div>
        <div>
          <p>096000-0121</p>
          <p>VE4/10E2300R012</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>ZEXEL NO :</p>
          <p>Specification :</p>
        </div>
        <div>
          <p>096000-0121</p>
          <p>VE4/10E2300R012</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>BOSCH NO :</p>
          <p>Specification :</p>
        </div>
        <div>
          <p>096000-0121</p>
          <p>VE4/10E2300R012</p>
        </div>
      </div>
    </div>
  );
}
