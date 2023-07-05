import React from "react";
import "./commitStyle.css";
import Items from "./items";

export default function index() {
  return (
    <div className="checked">
      <h1 style={{ color: "#010F52", lineHeight: '30px', paddingTop: '30px' }}>
        Apa pun kepada siapa pun dari mana saja
        <br />{" "}
        <span style={{fontSize: '18px', color: "#010F52",}}> Dapatkan semua produk dan layanan otomotif bersama kami</span>
      </h1>
      <Items />
    </div>
  );
}
