import React from "react";
import Quality from "../../../../assets/massive.png";
import Support from "../../../../assets/order.png";
import TransactionPrac from "../../../../assets/smart.png";
import "../service.css";

export default function index() {
  return (
    <>
      <div className="service">
        <div className="card-items">
          <img src={Quality} alt="" style={{ width: "80px", margin: "auto" }} />
          <h3>Kategori Masif</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolor
          </p>
        </div>
        <div className="card-items">
          <img src={Support} alt="" style={{ width: "80px", margin: "auto" }} />
          <h3>Fitur cerdas</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolor
          </p>
        </div>
        <div className="card-items">
          <img
            src={TransactionPrac}
            alt=""
            style={{ width: "80px", margin: "auto" }}
          />
          <h3>Kutipan Bisnis Cerdas</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolor
          </p>
        </div>
      </div>
    </>
  );
}
