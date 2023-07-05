import React from "react";
import AdminProf from "../../../assets/adminProf.png";
import "./AdminProf.css";

export default function index() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "auto",
          maxWidth: "1320px",
          alignItems: "center",
        }}
      >
        <img src={AdminProf} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <h1 style={{ color: "#010F52" }}>
              Admin Profesional
              <br />
              <span
                style={{
                  maxWidth: "700px",
                  color: "#243A73",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {" "}
                Ingin memilih admin profesional sesuai dengan kriteria yang Anda
                inginkan?
              </span>
            </h1>

            <p style={{ maxWidth: "600px", paddingRight: "50px" }}>
              Kami menyediakan beberapa admin profesional yang telah dilatih dan
              dipantau langsung oleh tim pengembang Aplikasi
            </p>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <button
              className="btn"
              style={{
                padding: "20px  50px",
                cursor: "pointer",
                backgroundColor: "#243A73",
                color: "white",
                border: "1px solid #243A73",
                borderRadius: "10px",
              }}
            >
              DAFTAR
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
                color: "#0E538C",
                fontWeight: "750",
                fontSize: "16px",
                paddingLeft: "30px",
              }}
            >
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
