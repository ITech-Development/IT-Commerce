import React from "react";
import { Link } from "react-router-dom";
import Edit from "../../../assets/edit.png";

function ShippingAddress({ profile }) {
  return (
    <div>
      <div className="alamat">
        <div className="setAddress">
          <h3>Alamat Pengiriman</h3>
          <Link to="/profile-update">
            <img className="edit" src={Edit} alt="" />
          </Link>
        </div>
        <div className="address-info">
          <h4>Nama Lengkap</h4>
          <p className="contentAl" style={{ paddingLeft: "40px" }}>
            : {profile?.fullName}
          </p>
        </div>
        <div className="address-info">
          <h4 className="hpus">Nomor Handphone</h4>
          <p className="contentAl" style={{ paddingLeft: "5px" }}>
            : {profile?.phoneNumber}
          </p>
        </div>
        <div className="address-info">
          <h4>Detail Alamat</h4>
          <p className="contentAl" style={{ paddingLeft: "55px" }}>
            : {profile?.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
