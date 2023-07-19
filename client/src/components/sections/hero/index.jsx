import React from "react";
import HeroImage from "../../../assets/Stepping up.png";
import "./heroSec.css";

export default function index() {
  return (
    <div className="container">
      <div className="content">
        <p className="title" style={{ color: "#010F52" }}>
          <strong>Perusahaan layanan dan eksekusi terpadu</strong> satu atap pertama di Indonesia
        </p>
        <p>Memberdayakan pembelian, Penjualan, dan Layanan Anda</p>
      </div>
      <img src={HeroImage} alt="" />
    </div>
  );
}
