import React from "react";
import "./heroProductList.css";
import ShopIcon from "../../../assets/shop.png";

export default function index() {
  return (
    <div
      className="heroProductList"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}
      >
        <h1 style={{ color: "#010F52", maxWidth: "450px" }}>
          Dapatkan hingga 10% dari produk yang dipilih
        </h1>
      </div>
      <div>
        <img
          src={ShopIcon}
          alt=""
          style={{
            width: "400px",
            display: "flex",
            borderRadius: "30%",
            border: "1px solid #F5F5F5",
          }}
        />
      </div>
    </div>
  );
}
