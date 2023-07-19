import React from "react";
import "./commitStyle.css";
import Items from "./items";

export default function index() {
  return (
    <div className="checked">
      <h1 className="title">
        Apa pun kepada siapa pun dari mana saja
        <br />
        <span className="subtitle">Dapatkan semua produk dan layanan otomotif bersama kami</span>
      </h1>
      <Items />
    </div>
  );
}
