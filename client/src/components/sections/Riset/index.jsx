import React from "react";
import './riset.css'
import CardItems from './cardItems'

export default function index() {
  return (
    <div className="riset" style={{marginBottom: '300px'}}>
      <h1 style={{ color: "#010F52", lineHeight: "30px", paddingTop: "30px" }}>
        Riset .Solusi .Eksekusi .Pemenuhan
        <br />
        <span style={{ fontSize: "18px", color: "#010F52" }}>
          Kami bekerja dengan teknologi dan keahlian: Memberikan Hasil yang
          memuaskan.
        </span>
      </h1>
      <CardItems/>
    </div>
  );
}
