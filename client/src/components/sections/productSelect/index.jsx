import React from "react";
import "./productSelect.css";

export default function index() {
  return (
    <div className="views" >

        <h1 style={{ color: "#010F52", maxWidth: "350px" }}>
          Belanja <br />
          Sekarang Juga
        </h1>
        <h4 style={{ color: "#010F52" }}>
          Ingin mengakses produk yang tepat dari kategori yang disesuaikan?
        </h4>

      <div>
        <button style={{backgroundColor: '#243A73', color: 'white', padding: '15px 25px', border: '1px solid #243A73', borderRadius: '5px', cursor: 'pointer'}}>Belanja & Dapatkan Promo Produk </button>
      </div>
    </div>
  );
}
