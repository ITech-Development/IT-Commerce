import React, { useState, useEffect } from "react";
import "./styless.css";
import CartCheckTrans from "../cartCheckTrans";
import axios from 'axios'

function Index() {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    // Fetch province data from the server
    const fetchProvinceData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/users/province", {
          headers: { access_token: localStorage.getItem("access_token") }
        });
        setProvince(response.data);
      } catch (error) {
        console.log('Error fetching provinces:', error);
      }
    };
    fetchProvinceData();
  }, []);

  const handleProvinceChange = async (event) => {
    const selectedProvinceId = event.target.value;
    // Fetch cities data based on the selected province
    // console.log(selectedProvinceId, 'TEST');
    try {
      const response = await axios.get(`http://localhost:3100/users/city/${selectedProvinceId}`, {
        headers: { access_token: localStorage.getItem("access_token") }
      });
      setCity(response.data.data);
    } catch (error) {
      console.log('Error fetching cities:', error);
    }
  };

  return (
    <div>
      <div className="alamat">
        <h2>Alamat Pengiriman</h2>
        <div>
          <h4>Evans (+62) 8162626267</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              Indo Teknik, Jalan Riau Ujung No. 898 904, Payung Sekaki, KOTA
              PEKANBARU - PAYUNG SEKAKI, RIAU, ID 28292
            </p>
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: "700",
                color: "blue",
                fontSize: "18px",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="alamat" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2>Produk Dipesan</h2>
        <CartCheckTrans />
        <div className="calcongkir" style={{ position: "relative", top: "-5px", marginBottom: "5px" }}>
          <h2>Pilih Metode Pengiriman</h2>
          <div>
            <h4>Connect to Raja Ongkir</h4>
            <select name="province" id="province" onChange={handleProvinceChange}>
              <option value="">Select Province</option>
              {province.map(item => (
                <option key={item.province_id} value={item.province_id}>{item.province}</option>
              ))}
            </select>
            <select name="city" id="city">
              <option value="">Select City</option>
              {Array.isArray(city) && city.map(item => (
                <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
              ))}

            </select>
            
          </div>
        </div>
        <div style={{ textAlign: 'end', padding: '20px 65px', fontSize: '20px' }}>
          <span>Total Bayar : </span>
          <span style={{ fontWeight: "700" }} className="amount">
            Rp.50.000
          </span>
        </div>
      </div>
      <div className="alamat" style={{ marginTop: "20px", marginBottom: "50px" }}>
        <h2>Metode Pembayaran</h2>
        <h4>Connect to Midtrans</h4>
      </div>
    </div>
  );
}

export default Index;
