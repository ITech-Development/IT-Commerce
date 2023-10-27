import React, { useState, useEffect } from "react";
import "../styless.css";
import axios from "axios";
import { Link } from "react-router-dom";
import VCR1 from "../../../assets/IT01.png";
import VCR2 from "../../../assets/MS01.png";
import VCR3 from "../../../assets/TK01.png";
import defaultImage from "../../../assets/adminProf.png";
import {
  useClearProductCartMutation,
  useGetCartsJuvindoQuery,
  useRemoveItemFromCartMutation
} from "../../../features/cart/apiCarts";
import { useGetMeQuery } from "../../../features/user/apiUser";
import Edit from "../../../assets/edit.png";
import PaymentModal from "../PaymentModal";

const validVoucherCodes = ["TK01", "IT01", "MS01"];

function Index() {
  const { data: carts } = useGetCartsJuvindoQuery()
  const { data: profile } = useGetMeQuery()
  const [removeItemFromCart] = useRemoveItemFromCartMutation()
  const [clearItemFromCart] = useClearProductCartMutation()
  const [token, setToken] = useState("");
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [courier, setCourier] = useState("jne");
  const [pengiriman, setPengiriman] = useState([]);

  const [selectedShippingCost, setSelectedShippingCost] = useState(null);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [checkoutProvince, setCheckoutProvince] = useState();
  const [checkoutCity, setCheckoutCity] = useState();
  const [checkoutSubdistrict, setCheckoutSubdistrict] = useState();
  const [checkoutCourier, setCheckoutCourier] = useState("jne");
  const [checkoutPengiriman, setCheckoutPengiriman] = useState();

  const [voucherCode, setVoucherCode] = useState(""); // State for the voucher code input
  const [isVoucherValid, setIsVoucherValid] = useState(false); // Flag to track voucher code validity


  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("https://indoteknikserver-732012365989.herokuapp.com/admin-sellers");
        setVouchers(response.data);
      } catch (error) {
        console.log("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  const handleVoucherChange = (event) => {
    setSelectedVoucher(event.target.value);
  };


  const handlePaymentProcess = async (data) => {
    const bayar = calculateTotalBayar();
    const pajak = calculatePPN()
    const config = {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    };

    let params = { total: bayar };
    const response = await axios({
      url: `https://indoteknikserver-732012365989.herokuapp.com/midtrans/juvindo`,
      params,
      data: {
        carts,
        checkoutProvince,
        checkoutCity,
        checkoutSubdistrict,
        checkoutCourier,
        selectedShippingCost,
        selectedVoucher,
        checkoutPengiriman,
        bayar,
        pajak,
      },
      headers: config,
      method: "post",
    });
    clearItemFromCart()
    setToken(response.data.token);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (token) {
      window.snap.embed(token, {
        embedId: "snap-container",

        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "Mid-client-R2krmA7ZU84Yd2Ug";
    scriptTag.setAttribute("data-client-key-juvindo", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  const handlerRemove = (id) => {
    removeItemFromCart(id)
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    carts?.forEach((e) => {
      const productPrice = e.product.unitPrice;
      const quantity = e.quantity;
      const totalProductPrice = productPrice * quantity;
      subtotal += totalProductPrice;
    });
    return subtotal;
  };

  const calculateVoucher = () => {
    if (!selectedVoucher) {
      return 0;
    }
    const subtotal = calculateSubtotal(); // Panggil fungsi calculateSubtotal untuk mendapatkan nilai subtotal
    const voucherPercentage = 6;
    const discountAmount = (subtotal * voucherPercentage) / 100;
    return discountAmount;
  };

  const calculatePPN = () => {
    const subtotal = calculateSubtotal();
    const voucherDiscount = calculateVoucher();
    const afterVoucherSubtotal = subtotal - voucherDiscount;
    const ppnPercentage = 11;
    const ppnAmount = (afterVoucherSubtotal * ppnPercentage) / 100;
    return ppnAmount;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const voucherDiscount = calculateVoucher();
    const ppnAmount = calculatePPN();
    const total = subtotal - voucherDiscount + ppnAmount;
    return total;
  };

  const calculateTotalBayar = () => {
    const total = calculateTotal();
    const result = total + totalShippingCost;
    return Math.round(result);
  };

  useEffect(() => {
    // Fetch province data from the server
    const fetchProvinceData = async () => {
      try {
        const response = await axios.get(
          "https://indoteknikserver-732012365989.herokuapp.com/users/province",
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        setProvince(response.data);
      } catch (error) {
        console.log("Error fetching provinces:", error);
      }
    };
    fetchProvinceData();
  }, []);

  const handleProvinceChange = async (event) => {
    const checkoutProvinceId = event.target.value;
    const found = province.find(
      (element) => element.province_id === checkoutProvinceId
    );
    setCheckoutProvince(found.province);
    try {
      const response = await axios.get(
        `https://indoteknikserver-732012365989.herokuapp.com/users/city/${checkoutProvinceId}`,
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      setCity(response.data.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  const handleCityChange = async (event) => {
    const selectedCityId = event.target.value;
    const found = city.find((element) => element.city_id === selectedCityId);
    setCheckoutCity(found.city_name);
    try {
      const response = await axios.get(
        `https://indoteknikserver-732012365989.herokuapp.com/users/subdistrict/${selectedCityId}`,
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      setSubdistrict(response.data.data);
    } catch (error) {
      console.log("Error fetching subdistricts:", error);
    }
  };

  const handlerGetCost = async (event) => {
    let access_token = localStorage.getItem("access_token");
    const selectedCityId = event.target.value;
    const found = subdistrict.find(
      (element) => element.subdistrict_id === selectedCityId
    );
    setCheckoutSubdistrict(found.subdistrict_name);
    const totalWeight = calculateTotalWeight(); // Calculate total weight dynamically
    let query = { destination: selectedCityId, courier, weight: totalWeight };
    let url = `https://indoteknikserver-732012365989.herokuapp.com/users/cost`;
    let { data } = await axios({
      url,
      params: query,
      headers: { access_token },
    });
    setPengiriman(data);
    // Assuming that the first shipping cost is selected by default, you can update this logic as needed.
    if (data && data.length > 0) {
      setCheckoutPengiriman(data[0]);
      setSelectedShippingCost(data[0].cost[0].value);
      setTotalShippingCost(data[0].cost[0].value);
    } else {
      setSelectedShippingCost(null);
      setTotalShippingCost(0);
    }
  };

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    carts?.forEach((cartItem) => {
      const productWeight = cartItem.product.weight; // Assuming each product has a 'weight' property
      const quantity = cartItem.quantity;
      totalWeight += productWeight * quantity;
    });
    return totalWeight;
  };

  const handleShippingCostChange = (event) => {
    const value = parseFloat(event.target.value);
    // const value = event.target.value
    setSelectedShippingCost(value);
    setTotalShippingCost(value);

  };

  const handlerSetCourier = async (event) => {
    const courier = event.target.value;
    setCheckoutCourier(courier);
    setCourier(courier);
  };

  const getVoucherImage = (code) => {
    // You can return the image URL based on the voucher code
    // For example, return the appropriate image URL for each valid voucher code
    if (code === "TK01") {
      return VCR1;
    } else if (code === "IT01") {
      return VCR2;
    } else if (code === "MS01") {
      return VCR3;
    }
    // Return a default image or handle other cases as needed
    return defaultImage;
  };


  const applyVoucher = () => {

    if (validVoucherCodes.includes(voucherCode)) {
      setSelectedVoucher(voucherCode); // Apply the valid voucher
      setIsVoucherValid(true); // Set the flag to true
    } else {
      // Display an error message or handle invalid voucher code here
      setIsVoucherValid(false); // Set the flag to false
    }
  };


  const paymentButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  function formatPrice(price) {
    const priceString = price.toString();
    const parts = priceString.split('.');
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


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
          <h4>Nama Lengkap :</h4>
          <p style={{ paddingLeft: "38px" }}>{profile?.fullName}</p>
        </div>
        <div className="address-info">
          <h4 className="hpus">Nomor Handphone :</h4>
          <p style={{ paddingLeft: "5px" }}>{profile?.phoneNumber}</p>
        </div>
        <div className="address-info">
          <h4>Detail Alamat :</h4>
          <p style={{ paddingLeft: "50px" }}>{profile?.address}</p>
        </div>
      </div>

      <div className="Produk">
        <h3 className="judulcheck">Produk Dipesan</h3>
        <div className="cart-container">
          {carts?.length === 0 ? (
            <div class="cart-empty">
              <p>Your cart is empty</p>
              <div class="start-shopping">
                <a href="/productlist">
                  <span>&lt;</span>
                  <span>Start Shopping</span>
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div class="titles">
                <h3 class="product-title">Product</h3>
                <h3 class="price">Price</h3>
                <h3 class="quantity">Quantity</h3>
                <h3 class="total">Total</h3>
              </div>
              <div class="cart-items">
                {carts?.map((e) => (
                  <div class="cart-item">
                    <div class="cart-product">
                      <Link to={`/products/${e.product.id}`}>
                        <img
                          className="imageProduct"
                          src={e.product.image}
                          alt={e.product.name}
                        />
                      </Link>
                      <div className="action">
                      <h3 className="title">{e.product.name}</h3>
                        {/* <p>{e.product.description}</p> */}
                        <button className="butRemove" onClick={() => handlerRemove(e.id)}>
                          Hapus
                        </button>
                      </div>
                    </div>
                    <div class="cart-product-price">
                      Rp.{(e.product.unitPrice).toLocaleString("id-ID", {})}
                    </div>
                    <div class="cart-product-quantityIR">
                      <div class="count">x {(e.quantity).toLocaleString("id-ID", {})}</div>
                    </div>
                    <div class="cart-product-total-price">
                      Rp.{(e.quantity * e.product.unitPrice).toLocaleString("id-ID", {})}
                    </div>
                  </div>
                ))}
              </div>
              <div class="cart-summary">
                <p></p>
                <div class="cart-checkout">
                  <div class="subtotal">
                    <span className="subtot">Subtotal :</span>
                    <span class="amountSub">Rp.{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div class="subtotalVou">
                    <span className="subtotVou">Voucher 6% :</span>
                    <span class="amountSub">Rp. {formatPrice(calculateVoucher())}</span>
                  </div>
                  <div className="ppn">
                    <span className="subtot">PPN 11% :</span>
                    <span className="amountSub"> Rp. {formatPrice(calculatePPN())}</span>
                  </div>
                  <div class="Total">
                    <span className="subtot">Total :</span>
                    <span style={{ fontWeight: "700" }} class="amountTot">
                    {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="ongPay full-width">
        <div className="calcongkir">
          <div>
            <h3 className="pilihShip">Pilih Metode Pengiriman</h3>
            <div>
              <select
                value={courier}
                onChange={handlerSetCourier}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="jne">
                  JNE
                </option>
                <option className="methodDeliveryOption" value="tiki">
                  TIKI
                </option>
                <option className="methodDeliveryOption" value="pos">
                  JNT
                </option>
                <option className="methodDeliveryOption" value="jnt">
                  LION PARCEL
                </option>
                <option className="methodDeliveryOption" value="jnt">
                  SICEPAT
                </option>
              </select>
              <select
                name="province"
                id="province"
                onChange={handleProvinceChange}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="">
                  Pilih Provinsi
                </option>
                {province.map((item) => (
                  <option
                    className="methodDeliveryOption"
                    key={item.province_id}
                    value={item.province_id}
                  >
                    {item.province}
                  </option>
                ))}
              </select>
              <select
                name="city"
                id="city"
                onChange={handleCityChange}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="">
                Pilih Kota / Kabupaten
                </option>
                {Array.isArray(city) &&
                  city.map((item) => (
                    <option
                      className="methodDeliveryOption"
                      key={item.city_id}
                      value={item.city_id}
                    >
                      {item.city_name}
                    </option>
                  ))}
              </select>
              <select
                name="subdistrict"
                id="subdistrict"
                onChange={handlerGetCost}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="">
                Pilih Kecamatan
                </option>
                {Array.isArray(subdistrict) &&
                  subdistrict.map((item) => (
                    <option
                      className="methodDeliveryOption"
                      key={item.subdistrict_id}
                      value={item.subdistrict_id}
                    >
                      {item.subdistrict_name}
                    </option>
                  ))}
              </select>
              {pengiriman
                ? pengiriman.map((el, index) => (
                  <div className="ShippingCost" key={index}>
                  <input
                      type="radio"
                      id={`shippingChoice${index}`}
                      name="shipping"
                      value={el.cost[0].value}
                      checked={selectedShippingCost === el.cost[0].value}
                      onChange={handleShippingCostChange}
                    />
                    <label htmlFor={`shippingChoice${index}`}>
                      Ongkos kirim : Rp.{(el.cost[0].value).toLocaleString("id-ID", {})}
                    </label>
                    <p>Layanan : {el.service}</p>
                    <p>Deskripsi : {el.description}</p>
                    <p>Estimasi : {el.cost[0].etd} hari</p>
                  </div>
                ))
                : null}
            </div>
          </div>
          <div className="secRightPay">
              <div>
                <h3 className="kodeVouc">Pilih Kode Voucher</h3>
                <p className="contentVouc">Silahkan pilih kode voucher dibawah untuk mendapatkan potongan belanja 6%!</p>
                <div class="voucher-container">
                  <input
                    class="voucher-input"
                    type="text"
                    placeholder="Masukkan kode voucher"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button class="apply-button" onClick={applyVoucher}>
                    Apply
                  </button>
                </div>
              </div>
              <div className="paybut">
                <div>
                  <span className="totBay">Total Bayar : </span>
                  <span
                    style={{ fontWeight: "700", paddingRight: "20px" }}
                    className="amountbay"
                  >
                    Rp. {formatPrice(calculateTotalBayar())}
                  </span>
                </div>
                <div>
                  {totalShippingCost === 0 ? (
                    <p className="befBut">
                      <i>Silahkan pilih metode pengiriman</i>
                    </p>
                  ) : (
                    <button
                      onClick={() => handlePaymentProcess()}
                      style={paymentButtonStyle}
                    >
                      Bayar Sekarang
                    </button>
                  )}
                </div>
                {/* Tampilkan modal jika isModalOpen adalah true */}
                <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
        </div>
        </div>
      </div>

    </div>
  );
}
export default Index;