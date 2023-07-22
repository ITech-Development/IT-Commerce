import React from "react";
import HeroImage from "../../../assets/ilus.png";
import "./heroSec.css";

export default function Index() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="title">
          <strong>Perusahaan Layanan dan Eksekusi Terpadu</strong>
        </h1>
        <p className="subtitle">Satu Atap Pertama di Indonesia</p>
        <p className="description">Memberdayakan pembelian, penjualan, dan layanan Anda</p>
        <button className="cta-button">Get Started</button>
      </div>
      <div className="hero-image-container">
        <img src={HeroImage} alt="" className="hero-image" />
      </div>
    </div>
  );
}
