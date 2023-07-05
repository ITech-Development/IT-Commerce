import React from "react";
import "./ComeRegis.css";
import ComeRegisImage from "../../../assets/ComeRegis.png";
import Oke from "../../../assets/Ok.png";

export default function index() {
  return (
    <div className="views" style={{marginTop: '30px'}}>
      <h1 style={{ color: "#010F52", margin: "auto", paddingTop: "30px" }}>
        Registrasi Praktis: Teknologi Cerdas: Layanan Cerdas
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ paddingTop: "50px" }}>
          <h4 style={{ color: "#010F52", maxWidth: "520px" }}>
            The only worldwide unified business place to offer your company's
            procurement and supply to the next level of success.{" "}
          </h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-arround",
                alignItems: "center",
                maxWidth: "290px",
              }}
            >
              <img src={Oke} alt="" />
              <p>AI- Diven digital dashboard</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-arround",
                alignItems: "center",
                maxWidth: "290px",
              }}
            >
              <img src={Oke} alt="" />

              <p>AI- Diven digital dashboard</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-arround",
                alignItems: "center",
                maxWidth: "290px",
              }}
            >
              <img src={Oke} alt="" />

              <p>AI- Diven digital dashboard</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-arround",
                alignItems: "center",
                maxWidth: "290px",
              }}
            >
              <img src={Oke} alt="" />

              <p>AI- Diven digital dashboard</p>
            </div>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <button
              className="btn"
              style={{
                padding: "18px  50px",
                cursor: "pointer",
                backgroundColor: "#243A73",
                color: "white",
                border: "1px solid #243A73",
                borderRadius: "10px",
              }}
            >
              MASUK
            </button>
            <button
              className="btn"
              style={{
                padding: "18px  50px",
                cursor: "pointer",
                color: "#0E538C",
                border: "1px solid #243A73",
                fontWeight: "800px",
                borderRadius: "10px",
                marginLeft: "20px",
              }}
            >
              DAFTAR{" "}
            </button>
          </div>
        </div>
        <img src={ComeRegisImage} alt="" />
      </div>
    </div>
  );
}
