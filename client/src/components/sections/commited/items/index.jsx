import React from "react";
import Quality from "../../../../assets/highQuality.png";
import Cerdas from "../../../../assets/cerdas.png";
import Dukungan from "../../../../assets/dukungan.png";
import Response from "../../../../assets/response.png";
import Support from "../../../../assets/support24.png";
import TransactionPrac from "../../../../assets/transactionpraktis.png";
import "../commitStyle.css";

export default function index() {
  return (
    <div className="commited">
      <div className="card-items">
        <div className="card-icon">
          <img src={Quality} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Kualitas Tinggi</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Support} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Bantuan 24/7</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={TransactionPrac} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Transaksi Praktis</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Cerdas} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Pengadaan yang Cerdas</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Response} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Respon Cepat</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Dukungan} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Dukungan Teknologi</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}
