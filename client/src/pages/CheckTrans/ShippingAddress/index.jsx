import React from 'react'
import { Link } from 'react-router-dom'

function ShippingAddress({ profile }) {
    return (
        <div>
            <div className="alamat">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Alamat Pengiriman</h2>
                    <Link to="/profile-update">
                        <button className="edit-button">Edit</button>
                    </Link>
                </div>
                <div className="address-info">
                    <h4>Nama Lengkap</h4>
                    <p style={{ paddingLeft: "40px" }}>: {profile?.fullName}</p>
                </div>
                <div className="address-info">
                    <h4>Nomor Handphone</h4>
                    <p style={{ paddingLeft: "5px" }}>: {profile?.phoneNumber}</p>
                </div>
                <div className="address-info">
                    <h4>Detail Alamat</h4>
                    <p style={{ paddingLeft: "55px" }}>: {profile?.address}</p>
                </div>
            </div>
        </div>
    )
}

export default ShippingAddress