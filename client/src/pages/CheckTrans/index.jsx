import React from "react";
import "./styless.css";
import CartCheckTrans from "../cartCheckTrans";

function index() {
  return (
    <div>
      <div className="alamat">
        <h2>Alamat Pengiriman</h2>
          <h4 style={{padding :'10px 0'}}>Evans (+62) 8162626267</h4>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              Indo Teknik, Jalan Riau Ujung No. 898 904, Payung Sekaki, KOTA
              PEKANBARU - PAYUNG SEKAKI, RIAU, ID 28292
            </p>
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: "700",
                color: "blue",
                fontSize: "18px",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div
        className="alamat"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <h2>Produk Dipesan</h2>
        <CartCheckTrans />
        <div
          className="calcongkir"
          style={{ position: "relative", top: "-5px", marginBottom: "5px" }}
        >
          <h2>Pilih Metode Pengiriman</h2>
          <div>
            <h4>Connect to Raja Ongkir</h4>
          </div>
        </div>
        <div style={{textAlign: 'end', padding: '20px 65px', fontSize: '20px'}}>
          <span>Total Bayar : </span>
          <span style={{ fontWeight: "700" }} class="amount">
            Rp.50.000
          </span>
        </div>
      </div>

      <div
        className="alamat"
        style={{ marginTop: "20px", marginBottom: "50px" }}
      >
        <h2>Metode Pembayaran</h2>
        <div>
          <h4>Connect to Midtrans</h4>
        </div>
      </div>
    </div>
  );
}

export default index;