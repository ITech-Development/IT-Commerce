import React from "react";
import Profile from "../../../assets/user.png";
import Admin from "../admin";

export default function index() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <img style={{ width: "5%", height: "5%" }} src={Profile} alt="" />
        <div>
          <h3>Handoko</h3>
          <p style={{ fontStyle: "italic" }}>01/04/2023</p>
          <p>
            Indo Teknik is a distributor and workshop of various reputable
            diesel spare parts in Indonesia. Conquering the market since 10
            November 2005, Indo Teknik visioned in providing the best service
            for their customers by utilizing the best machinery and highly
            qualified, experienced, and professional mechanics. Located on Jalan
            Riau-Ujung No.898-904, Pekanbaru, Riau, Indonesia, Indo Teknik
            thrive to give the best services and products for their customers.
          </p>
        </div>
      </div>
      <Admin />
    </div>
  );
}
