import React, { useState, useEffect } from "react";
import HeroImage from "../../../assets/ilus.png";
import "./heroSec.css";
import { Link } from "react-router-dom";

export default function Index() {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    setIsTextVisible(true);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className={`title ${isTextVisible ? "animate-text" : ""}`}>
          <strong>
            Perusahaan Layanan dan Eksekusi Terpadu
          </strong>
        </h1>
        <p className="subtitle">
          Satu Atap Pertama di Indonesia
        </p>
        <p className="description">
          Memberdayakan pembelian, penjualan, dan layanan Anda
        </p>
        <Link to="/productlist">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
      <div className="hero-image-container">
        <img src={HeroImage} alt="" className="hero-image" />
      </div>
    </div>
  );
}
