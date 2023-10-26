import React from "react";
import { Link } from "react-router-dom";
// import { useSpring, animated } from "react-spring";
import "./ProductCategories.css"; // Import your CSS file
// import vc01 from "../../../assets/TK01.png";
// import vc02 from "../../../assets/MS01.png";
// import vc03 from "../../../assets/IT01.png";
import SeeAll from "../../../assets/seeAll.png";
import styled from "styled-components";

const categoryData = [
  {
    to: "/nozzle",
    title: "Nozzle",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509167/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Nozzle_dl1ncg.png",
  },
  {
    to: "/delivery-valve",
    title: "Delivery Valve",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509163/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/D_Valve_zm6neh.png",
  },
  {
    to: "/element",
    title: "Element",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509166/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Element_aodlth.png",
  },
  {
    to: "/ve-pump",
    title: "VE Pump",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509166/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/VE_Pump_jjstdn.png",
  },
  {
    to: "/ve-pump-parts",
    title: "VE Pump Parts",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509168/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/VE_Parts_ucovbd.png",
  },
  {
    to: "/injector",
    title: "Injector",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509166/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Injector_vdvsq3.png",
  },
  {
    to: "/scv",
    title: "Scv",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509168/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/SCV_hxgo3d.png",
  },
  {
    to: "/turboparts",
    title: "Turbo & Parts",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509169/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Turbo_Parts_hybhex.png",
  },
  {
    to: "/head-rotor",
    title: "Head Rotor",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697509168/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Rotor_Head_d97dbp.png",
  },
  {
    to: "/sensor",
    title: "Sensor",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1697622637/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru%202/Sensor_Common_Rail_en1sev.png",
  },
];

// const voucherData = [
//   {
//     imageUrl: vc03,
//     description: "Deskripsi Voucher 1",
//   },
//   {
//     imageUrl: vc02,
//     description: "Deskripsi Voucher 2",
//   },
//   {
//     imageUrl: vc01,
//     description: "Deskripsi Voucher 3",
//   },
// ];

function ProductCategoryCard({ to, title, imageUrl }) {
  return (
    <div className="category-card">
      <Link to={to} target="blank">
        <img src={imageUrl} alt={title} className="category-image" />
        <p className="titleCategory">{title}</p>
      </Link>
    </div>
  );
}

function ProductCategories() {
  return (
    <div style={{margin: '0 30px'}}>
    <div
      className="prdt"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "auto",
        width: 'auto',
        height: 'auto'
      }}
    >
      <div className="category-container">
        <div className="category-section">
          <h2>
            Pilihan <br />
            Kategori Terlaris
          </h2>
          <Link to="/category-list">
            <Buttons>Lihat Semua</Buttons>
          </Link>
          <Link to="/category-list">
            <div className="allmas">
              <img className="seeAll" src={SeeAll} alt="" />
              <p className="seeAlltext">lihat semua</p>
            </div>
          </Link>
        </div>
        <div className="category-sectionCategories">
          <div className="card-grid">
            {categoryData.map((category, index) => (
              <ProductCategoryCard
                key={index}
                to={category.to}
                title={category.title}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="secRight">
        <h3 className="sech3">Klaim Voucher Sekarang juga!</h3>
        <p>Dapatkan diskon hingga 3% dari setiap transaksi anda!</p>
        <div className="vchp">
          {voucherData.map((voucher, index) => (
            <img key={index} className="imgvc" src={voucher.imageUrl} alt="" />
          ))}
        </div>
      </div> */}
    </div>
    </div>
  );
}

export default ProductCategories;

const Buttons = styled.button`
background-color: #3498db;
color: #fff;
padding: 10px 20px;
border: none;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s;
`