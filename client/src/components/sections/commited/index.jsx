import React from "react";
import Items from "./items";
import indexStyles from "./indexStyles";

export default function Index() {
  return (
    <div style={indexStyles.container}>
      <h2 style={indexStyles.title}>
        Apa pun kepada siapa pun dari mana saja
        <br />
        <span style={indexStyles.subtitle}>
          Dapatkan semua produk dan layanan otomotif bersama kami
        </span>
      </h2>
      <Items />
    </div>
  );
}
