import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../features/cartSlice";
import "./styless.css";
import axios from "axios";
import { Link } from "react-router-dom";
import VCR1 from "../../assets/IT01.png";
import VCR2 from "../../assets/MS01.png";
import VCR3 from "../../assets/TK01.png";
// const API_URL = "https://indoteknikserver-732012365989.herokuapp.com"; // Define your API URL here

function Index() {
  let [carts, setCarts] = useState([]);
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
  
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/profiles";
      axios({ url, headers: { access_token: accessToken } })
        .then(async ({ data }) => {
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handlePaymentProcess = async (data) => {
    const bayar = calculateTotalBayar();
    const config = {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("access_token"),
    };

    const response = await axios({
      url: `https://indoteknikserver-732012365989.herokuapp.com/users/midtrans?total=${bayar}`,
      data: { carts },
      headers: config,
      method: "post",
    });
    console.log(response.data, "dari front end");
    setToken(response.data.token);
  };

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line no-undef
      snap.pay(token, {
        onSuccess: function (result) {
          // return changeStatus();
          console.log("snap payyyyyyyyyyy");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-5sjWc9AhHLstKFML";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  const handlerInc = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/product-carts/increment/" + id;
      axios({ url, method: "patch", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("incrementttt");
        });
    }
  };

  const handlerDec = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/product-carts/decrement/" + id;
      axios({ url, method: "patch", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, "ASdasdas");
        })
        .catch((error) => {
          console.log("asdasd");
        });
    }
  };

  const handlerRemove = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/product-carts/remove/" + id;
      axios({ url, method: "delete", headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, "remooove");
        })
        .catch((error) => {
          console.log("asdasd remove");
        });
    }
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    carts.forEach((e) => {
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
    // const result = subtotal - discountAmount;
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
    return result;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = "https://indoteknikserver-732012365989.herokuapp.com/product-carts/";
      axios({ url, headers: { access_token: accessToken } })
        .then(async ({ data }) => {
          setCarts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
    const selectedProvinceId = event.target.value;
    try {
      const response = await axios.get(
        `https://indoteknikserver-732012365989.herokuapp.com/users/city/${selectedProvinceId}`,
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

  const calculateTotalWeight = () => {
    let totalWeight = 0;
    carts.forEach((cartItem) => {
      const productWeight = cartItem.product.weight; // Assuming each product has a 'weight' property
      const quantity = cartItem.quantity;
      totalWeight += productWeight * quantity;
    });
    console.log(totalWeight, 'dari total wieght');
    return totalWeight;
  };

  const handlerGetCost = async (event) => {
    let access_token = localStorage.getItem("access_token");
    const selectedCityId = event.target.value;
    const totalWeight = calculateTotalWeight(); // Calculate total weight dynamically
    let query = { destination: selectedCityId, courier, weight: totalWeight };
    let url = `https://indoteknikserver-732012365989.herokuapp.com/users/cost`;
    let { data } = await axios({
      url,
      params: query,
      headers: { access_token },
    });
    setPengiriman(data);

    if (data && data.length > 0) {
      setSelectedShippingCost(data[0].cost[0].value);
      setTotalShippingCost(data[0].cost[0].value);
    } else {
      setSelectedShippingCost(null);
      setTotalShippingCost(0);
    }
  };

  const handleShippingCostChange = (event) => {
    const value = parseFloat(event.target.value);
    setSelectedShippingCost(value);
    setTotalShippingCost(value);
    console.log(value, "valuvalue");
  };

  const handlerSetCourier = async (event) => {
    const courier = event.target.value;
    setCourier(courier);
  };

  return (
    <div>
      <div className="alamat">
        <h2>Alamat Pengiriman</h2>
        <div className="address-info">
          <h4>Nama Lengkap</h4>
          <p>: {profile.user?.fullName}</p>
        </div>
        <div className="address-info">
          <h4>Nomor Handphone</h4>
          <p>: {profile.user?.phoneNumber}</p>
        </div>
        <div className="address-info">
          <h4>Detail Alamat</h4>
          <p>: {profile.user?.address}</p>
        </div>
        <button className="edit-button">Edit</button>
      </div>

      <div
        className="alamat"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <h2>Produk Dipesan</h2>
        {/* <CartCheckTrans /> */}
        <div class="cart-container">
          {carts.length === 0 ? (
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
                        <img src={e.product.image} alt={e.product.name} />
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
                      <button onClick={() => handlerDec(e.id)}>-</button>
                      <div class="count">{e.quantity}</div>
                      <button onClick={() => handlerInc(e.id)}>+</button>
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
              {vouchers[3]?.voucherCode}
              <img src={VCR1} alt="IT 01" width="150" />
            </label>
            <label key={vouchers[0]?.id}>
              <input
                type="radio"
                value={vouchers[0]?.voucherCode}
                checked={selectedVoucher === vouchers[0]?.voucherCode}
                onChange={handleVoucherChange}
              />
              {vouchers[0]?.voucherCode}
              <img src={VCR2} alt="MS 01" width="150" />
            </label>
            <label key={vouchers[1]?.id}>
              <input
                type="radio"
                value={vouchers[1]?.voucherCode}
                checked={selectedVoucher === vouchers[1]?.voucherCode}
                onChange={handleVoucherChange}
              />
              {vouchers[1]?.voucherCode}
              <img src={VCR3} alt="MS 01" width="150" />
            </label>
          </div>
        </div>

        <div
          className="calcongkir"
          style={{ position: "relative", top: "-5px", marginBottom: "5px" }}
        >
          <h2>Pilih Metode Pengiriman</h2>
          <div>
            <select onChange={handlerSetCourier}>
              <option value={courier} >Select Courier</option>
              <option value="jne">JNE</option>
              <option value="tiki">TIKI</option>
              <option value="pos">Pos Indonesia</option>
              <option value="jnt">J&T</option>
              {/* <option value="ide">Ide Express</option> */}
              {/* <option value="anteraja">Anteraja</option>
              <option value="sicepat">Sicepat</option> */}
            </select>
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
            <input
              type="number"
              value={calculateTotalWeight()}
              readOnly
              placeholder="Total Weight in Grams"
            />
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
          style={{ textAlign: "end", padding: "20px 65px", fontSize: "20px" }}
        >
          <span>Total Bayar : </span>
          <span style={{ fontWeight: "700" }} className="amount">
            Rp. {calculateTotalBayar()}
          </span>
          {totalShippingCost === 0 ? (
            <p>
              <i>Silahkan pilih metode pengiriman</i>
            </p>
          ) : (
            <button onClick={() => handlePaymentProcess()}>Payment</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Index;