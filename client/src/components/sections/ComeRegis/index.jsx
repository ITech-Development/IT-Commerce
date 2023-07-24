import React from "react";
import "./ComeRegis.css";
import ComeRegisImage from "../../../assets/ComeRegis.png";
import Oke from "../../../assets/Ok.png";

const styles = {
  views: {
    marginTop: "30px",
  },
  h1: {
    color: "#010F52",
    margin: "auto",
    paddingTop: "30px",
    maxWidth: "700px",
    textAlign: "center",
  },
  h4: {
    color: "#010F52",
    maxWidth: "520px",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "50px",
  },
  flexItem: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: "290px",
  },
  img: {
    width: "24px",
    marginRight: "10px",
  },
  btn: {
    padding: "18px 50px",
    cursor: "pointer",
    borderRadius: "10px",
    border: "1px solid #243A73",
  },
  btnPrimary: {
    backgroundColor: "#243A73",
    color: "white",
  },
  btnSecondary: {
    color: "#0E538C",
    fontWeight: "800px",
    marginLeft: "20px",
  },
};

export default function Index() {
  return (
    <div className="views" style={styles.views}>
      <h1 style={styles.h1}>
        Registrasi Praktis: Teknologi Cerdas: Layanan Cerdas
      </h1>
      <div style={styles.flexContainer}>
        <div>
          <h4 style={styles.h4}>
            The only worldwide unified business place to offer your company's
            procurement and supply to the next level of success.
          </h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[1, 2, 3, 4].map((index) => (
              <div key={index} style={styles.flexItem}>
                <img src={Oke} alt="" style={styles.img} />
                <p>AI- Driven digital dashboard</p>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "30px" }}>
            <button
              className="btn"
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              MASUK
            </button>
            <button
              className="btn"
              style={{ ...styles.btn, ...styles.btnSecondary }}
            >
              DAFTAR
            </button>
          </div>
        </div>
        <img src={ComeRegisImage} alt="" />
      </div>
    </div>
  );
}
