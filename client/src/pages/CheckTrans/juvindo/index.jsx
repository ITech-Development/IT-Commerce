import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../../features/cartSlice";
import "../styless.css";
import axios from "axios";
import { Link } from "react-router-dom";
import VCR1 from "../../../assets/IT01.png";
import VCR2 from "../../../assets/MS01.png";
import VCR3 from "../../../assets/TK01.png";
import {
  useClearProductCartMutation,
  useGetCartsJuvindoQuery,
  useRemoveItemFromCartMutation
} from "../../../features/cart/apiCarts";
import { useGetMeQuery } from "../../../features/user/apiUser";

function Index() {
  const { data: carts } = useGetCartsJuvindoQuery()
  const { data: profile } = useGetMeQuery()
  const [removeItemFromCart] = useRemoveItemFromCartMutation()
  const [clearItemFromCart] = useClearProductCartMutation()

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const [checkoutProvince, setCheckoutProvince] = useState();
  const [checkoutCity, setCheckoutCity] = useState();
  const [checkoutSubdistrict, setCheckoutSubdistrict] = useState();
  const [checkoutCourier, setCheckoutCourier] = useState("jne");
  const [checkoutPengiriman, setCheckoutPengiriman] = useState();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:3100/admin-sellers");
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

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handlePaymentProcess = async (data) => {

    const bayar = calculateTotalBayar();
    const pajak = calculatePPN()
    const config = {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    };

    let params = { total: bayar };
    const response = await axios({
      url: `http://localhost:3100/midtrans/juvindo`,
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
        pajak
      },
      headers: config,
      method: "post",
    });
    clearItemFromCart()
    setToken(response.data.token);
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
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-_MWorWyIPYpYXjUo";
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
    const voucherPercentage = 3;
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
          "http://localhost:3100/users/province",
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
        `http://localhost:3100/users/city/${checkoutProvinceId}`,
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
        `http://localhost:3100/users/subdistrict/${selectedCityId}`,
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
    let url = `http://localhost:3100/users/cost`;
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

  const paymentButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <div id="snap-container"></div>
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

      <div
        className="alamat"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <h2>Produk Dipesan</h2>
        {/* <CartCheckTrans /> */}
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
                          src={e.product.image}
                          alt={e.product.name}
                        />
                      </Link>
                      <div>
                        <h3>{e.product.name}</h3>
                        <p>{e.product.description}</p>
                        <button onClick={() => handlerRemove(e.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="cart-product-price">
                      Rp.{e.product.unitPrice}
                    </div>
                    <div class="cart-product-quantity">
                      <button disabled>-</button>
                      <div class="count">{e.quantity}</div>
                      <button disabled>+</button>
                    </div>
                    <div class="cart-product-total-price">
                      Rp.{e.quantity * e.product.unitPrice}
                    </div>
                  </div>
                ))}
              </div>
              <div class="cart-summary">
                <p></p>
                <div class="cart-checkout" style={{ lineHeight: "30px" }}>
                  <div class="subtotal">
                    <span>Subtotal :</span>
                    <span class="amount">Rp.{calculateSubtotal()}</span>
                  </div>
                  <div class="subtotal">
                    <span>Voucher 3% :</span>
                    <span class="amount">Rp. {calculateVoucher()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontStyle: "italic",
                    }}
                  >
                    <span>PPN 11% :</span>
                    <span className="amount"> Rp. {calculatePPN()}</span>
                  </div>
                  <div class="subtotal">
                    <span>Total :</span>
                    <span style={{ fontWeight: "700" }} class="amount">
                      {calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2>Pilih Kode Voucher</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-arround",
              marginBottom: "30px",
            }}
          >
            <label key={vouchers[3]?.id}>
              <input
                type="radio"
                value={vouchers[3]?.voucherCode}
                checked={selectedVoucher === vouchers[3]?.voucherCode}
                onChange={handleVoucherChange}
              />
              {/* {vouchers[3]?.voucherCode} */}
              <img src={VCR1} alt="IT 01" width="150" />
            </label>
            <label key={vouchers[4]?.id}>
              <input
                type="radio"
                value={vouchers[4]?.voucherCode}
                checked={selectedVoucher === vouchers[4]?.voucherCode}
                onChange={handleVoucherChange}
              />
              {/* {vouchers[4]?.voucherCode} */}
              <img src={VCR2} alt="MS 01" width="150" />
            </label>
            <label key={vouchers[5]?.id}>
              <input
                type="radio"
                value={vouchers[5]?.voucherCode}
                checked={selectedVoucher === vouchers[5]?.voucherCode}
                onChange={handleVoucherChange}
              />
              {/* {vouchers[5]?.voucherCode} */}
              <img src={VCR3} alt="MS 01" width="150" />
            </label>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="calcongkir"
            style={{ position: "relative", top: "-5px", marginBottom: "5px" }}
          >
            <h2>Pilih Metode Pengiriman</h2>
            <div>

              <select
                value={courier}
                onChange={handlerSetCourier}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="jne">
                  jne
                </option>
                <option className="methodDeliveryOption" value="tiki">
                  tiki
                </option>
                <option className="methodDeliveryOption" value="pos">
                  pos
                </option>
                <option className="methodDeliveryOption" value="jnt">
                  jnt
                </option>
              </select>
              {/* <input
                type="number"
                value={calculateTotalWeight()}
                readOnly
                placeholder="Total Weight in Grams"
              /> */}
              <select
                name="province"
                id="province"
                onChange={handleProvinceChange}
                className="methodDeliverySelect"
              >
                <option className="methodDeliveryOption" value="">
                  Select Province
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
                  Select City
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
                  Select Subdistrict
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
                  <div key={index}>
                    <input
                      type="radio"
                      id={`shippingChoice${index}`}
                      name="shipping"
                      value={el.cost[0].value}
                      checked={selectedShippingCost === el.cost[0].value}
                      onChange={handleShippingCostChange}
                    />
                    <label htmlFor={`shippingChoice${index}`}>
                      Shipping Cost: Rp.{el.cost[0].value}
                    </label>
                    <p>Service: {el.service}</p>
                    <p>Description: {el.description}</p>
                    <p>Est: {el.cost[0].etd} Days</p>
                  </div>
                ))
                : null}
            </div>
          </div>
          <div
            style={{ padding: "20px 65px", fontSize: "20px", display: 'flex', justifyContent: 'end' }}
          >
            <div style={{ paddingTop: '5px' }}>

              <span >Total Bayar : </span>
              <span style={{ fontWeight: "700", paddingRight: '20px' }} className="amount">
                Rp. {calculateTotalBayar()}
              </span>
            </div>
            <div>
              {totalShippingCost === 0 ? (
                <p >
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

          </div>
        </div>
      </div>

    </div>
  );
}
export default Index;
