import React from "react";
import ListProduct from "./cardProduct";

export default function index() {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1410px",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <h1>Produk Rekomendasi</h1>
      <ListProduct />
    </div>
  );
}
