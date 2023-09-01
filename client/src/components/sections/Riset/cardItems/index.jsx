import React from "react";
import "../riset.css";
import Analytic from "../../../../assets/analytic.png";
import Execution from "../../../../assets/execution.png";
import Delivery from "../../../../assets/delivery.png";
import Feedback from "../../../../assets/feedback.png";
import Step from "../../../../assets/step.png";
import Tunjuk from "../../../../assets/tunjuk.png";

export default function index() {
  return (
    <>
      <div>
        <img
          src={Tunjuk}
          alt=""
          style={{
            position: "relative",
            width: "80px",
            height: "100px",
            left: "-270px",
            top: "-40px",
          }}
        />
        <img
          src={Step}
          alt=""
          style={{
            position: "relative",
            width: "80px",
            height: "90px",
            right: "160px",
            top: "110px",
          }}
        />
        <img
          src={Step}
          alt=""
          style={{
            position: "relative",
            width: "80px",
            height: "90px",
            right: "-20px",
            top: "210px",
          }}
        />
        <img
          src={Step}
          alt=""
          style={{
            position: "relative",
            width: "80px",
            height: "90px",
            right: "-203px",
            top: "310px",
          }}
        />
      </div>
      <div className="commite" style={{ textAlign: "left" }}>
        <div className="card-riset">
          <img
            src={Analytic}
            alt=""
            style={{
              width: "150px",
              position: "relative",
              top: "-80px",
              left: "-55px",
            }}
          />
          <div style={{ position: "relative", top: "-100px" }}>
            <h3 style={{ lineHeight: "1px" }}>Kualitas Tinggi</h3>
            <p style={{ fontSize: "13px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
          </div>
        </div>
        <div
          className="card-riset"
          style={{ position: "relative", top: "80px" }}
        >
          <img
            src={Execution}
            alt=""
            style={{
              width: "150px",
              position: "relative",
              top: "-80px",
              left: "-55px",
            }}
          />
          <div style={{ position: "relative", top: "-100px" }}>
            <h3 style={{ lineHeight: "1px" }}>bantuan 24/7</h3>
            <p style={{ fontSize: "13px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
          </div>
        </div>
        <div
          className="card-riset"
          style={{ position: "relative", top: "180px" }}
        >
          <img
            src={Delivery}
            alt=""
            style={{
              width: "150px",
              position: "relative",
              top: "-80px",
              left: "-55px",
            }}
          />
          <div style={{ position: "relative", top: "-100px" }}>
            <h3 style={{ lineHeight: "1px" }}>Transaksi praktis</h3>
            <p style={{ fontSize: "13px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
          </div>
        </div>
        <div
          className="card-riset"
          style={{ position: "relative", top: "280px" }}
        >
          <img
            src={Feedback}
            alt=""
            style={{
              width: "150px",
              position: "relative",
              top: "-80px",
              left: "-55px",
            }}
          />
          <div style={{ position: "relative", top: "-100px" }}>
            <h3 style={{ lineHeight: "1px" }}>Transaksi praktis</h3>
            <p style={{ fontSize: "13px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
