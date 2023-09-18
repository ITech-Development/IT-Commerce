import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "./ProductCategories.css"; // Import your CSS file
import vc01 from "../../../assets/TK01.png";
import vc02 from "../../../assets/MS01.png";
import vc03 from "../../../assets/IT01.png";
import SeeAll from '../../../assets/seeAll.png'

function ProductCategoryCard({ to, title }) {
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
        <h1 className="titleCategory">{title}</h1>
      </Link>
    </animated.div>
  );
}

function ProductCategories() {
  return (
    <div className="prdt"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "auto",
        maxWidth: '1420px'
      }}
    >
      <div className="category-container">
        <div className="category-section">
          <h1>
            Pilihan <br/>
            Kategori
            Terlaris
          </h1>
          <Link to="/productlist">
            <img className="seeAll" src={SeeAll} alt="" />
            <p className="seeAlltext">lihat semua</p>
          </Link>
          <Link to="/productlist">
            <button className="view-all-button">Lihat Semua Produk</button>
          </Link>
        </div>
        <div className="category-sectionCategories">
          <div className="card-grid">
            <ProductCategoryCard to="/nozzle" title="Nozzle" />
            <ProductCategoryCard to="/delivery-valve" title="Delivery Valve" />
            <ProductCategoryCard to="/element" title="Element" />
            <ProductCategoryCard to="/ve-pump" title="VE Pump" />
            <ProductCategoryCard to="/ve-pump-parts" title="VE Pump Parts" />
            <ProductCategoryCard to="/head-rotor" title="Head Rotor" />
            <ProductCategoryCard to="/injector" title="Injector" />
            <ProductCategoryCard to="/scv" title="Scv" />
            <ProductCategoryCard to="/turboparts" title="Turbo & Parts" />
          </div>
        </div>
      </div>
      <div className="secRight">
        <h3 className="sech3">Klaim Voucher Sekarang!</h3>
        <p>Dapatkan diskon hingga 3% dari setiap transaksi anda!</p>
        <div className="vchp">
          <img className="imgvc" src={vc03} alt="" />
          <img className="imgvc" src={vc02} alt="" />
          <img className="imgvc" src={vc01} alt="" />
        </div>
        {/* <Link to="/productlist">

        <button className="view-all-button-Voucher" style={{marginTop: '30px'}}>Lihat Semua Produk</button>
      </Link> */}
      </div>
    </div>
  );
}

export default ProductCategories;
