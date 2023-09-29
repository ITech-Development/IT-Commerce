import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./ProductCategories.css"; // Import your CSS file
import vc01 from "../../../assets/TK01.png";
import vc02 from "../../../assets/MS01.png";
import vc03 from "../../../assets/IT01.png";
import SeeAll from "../../../assets/seeAll.png";

const categoryData = [
  {
    to: "/nozzle",
    title: "Nozzle",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Nozzle_nisnl0.png",
  },
  {
    to: "/delivery-valve",
    title: "Delivery Valve",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Del_Valve_jqedrn.png",
  },
  {
    to: "/element",
    title: "Element",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Element_iyzgy6.png",
  },
  {
    to: "/ve-pump",
    title: "VE Pump",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Nozzle_nisnl0.png",
  },
  {
    to: "/ve-pump-parts",
    title: "VE Pump Parts",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Del_Valve_jqedrn.png",
  },
  {
    to: "/injector",
    title: "Injector",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Element_iyzgy6.png",
  },
  {
    to: "/scv",
    title: "Scv",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Nozzle_nisnl0.png",
  },
  {
    to: "/turboparts",
    title: "Turbo & Parts",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Del_Valve_jqedrn.png",
  },
  {
    to: "/head-rotor",
    title: "Head Rotor",
    imageUrl:
      "https://res.cloudinary.com/dcbryptkx/image/upload/v1694586958/IndoTeknikMarketplace/product/Icon/Ikon%20Kategori%20Baru/Element_iyzgy6.png",
  },
];

const voucherData = [
  {
    imageUrl: vc03,
    description: "Deskripsi Voucher 1",
  },
  {
    imageUrl: vc02,
    description: "Deskripsi Voucher 2",
  },
  {
    imageUrl: vc01,
    description: "Deskripsi Voucher 3",
  },
];

function ProductCategoryCard({ to, title, imageUrl }) {
  const cardAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "scale(1.05)" });
        await next({ transform: "scale(1)" });
      }
    },
  });

  return (
    <animated.div className="category-card" style={cardAnimation}>
      <Link to={to} target="blank">
        <img src={imageUrl} alt={title} className="category-image" />
        <p className="titleCategory">{title}</p>
      </Link>
    </animated.div>
  );
}

function ProductCategories() {
  return (
    <div
      className="prdt"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "auto",
        maxWidth: "1420px",
      }}
    >
      <div className="category-container">
        <div className="category-section">
          <h1>
            Pilihan <br />
            Kategori Terlaris
          </h1>
          <Link to="/productlist">
            <div className="allmas">
              <img className="seeAll" src={SeeAll} alt="" />
              <p className="seeAlltext">lihat semua</p>
            </div>
          </Link>
          <Link to="/category-list">
            <button className="view-all-button">Lihat Semua Produk Kategori</button>
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
      <div className="secRight">
        <h3 className="sech3">Klaim Voucher Sekarang juga!</h3>
        <p>Dapatkan diskon hingga 3% dari setiap transaksi anda!</p>
        <div className="vchp">
          {voucherData.map((voucher, index) => (
            <img key={index} className="imgvc" src={voucher.imageUrl} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCategories;