import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../features/cartSlice";
import "./styless.css";
import CartCheckTrans from "../cartCheckTrans";
import axios from "axios";

function Index() {
  let [carts, setCarts] = useState([])
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [token, setToken] = useState('')
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [courier, setCourier] = useState("jne");
  const [pengiriman, setPengiriman] = useState([]);
  const [selectedShippingCost, setSelectedShippingCost] = useState(null);
  const [totalShippingCost, setTotalShippingCost] = useState(0);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const process = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token")
      }
    }

    const response = await axios.post('http://localhost:3100/users/midtrans', data, config)
    setToken(response.data.token);
  }

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result))
          setToken('')
        },
        onPending: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result))
          setToken('')
        },
        onError: (error) => {
          console.log(error);
          setToken('')
        },
        onClose: () => {
          console.log('Anda belum menyelesaikan pembayaran');
          setToken('')
        }
      })
    }
  }, [token])


  useEffect(() => {
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement('script')
    scriptTag.src = midtransUrl

    const midtransClientKey = 'SB-Mid-client-5sjWc9AhHLstKFML'
    scriptTag.setAttribute('data-client-key', midtransClientKey)

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  })

  const handlerInc = (id) => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts/increment/' + id
      axios({ url, method: 'patch', headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(error => { console.log('incrementttt'); })
    }
  }


  const handlerDec = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts/decrement/' + id
      axios({ url, method: 'patch', headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, 'ASdasdas');
        })
        .catch(error => { console.log('asdasd'); })
    }
  }

  const handlerRemove = (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts/remove/' + id
      axios({ url, method: 'delete', headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, 'remooove');
        })
        .catch(error => { console.log('asdasd remove'); })
    }
  }

  const handlerClear = () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts/clear/'
      axios({ url, method: 'delete', headers: { access_token: accessToken } })
        .then(({ data }) => {
          console.log(data, 'remooove all');
        })
        .catch(error => { console.log('asdasd remove all'); })
    }
  }

  const calculateSubtotal = () => {
    let subtotal = 0
    carts.forEach((e) => {
      const productPrice = e.product.unitPrice
      const quantity = e.quantity
      const totalProductPrice = productPrice * quantity
      subtotal += totalProductPrice
    })
    return subtotal
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const ppn = subtotal * 0.11 // menghitung nilai ppn (11% dari subtotal)
    const subtotalPpn = subtotal + ppn // menghitung total(subtotal + ppn)
    return subtotalPpn.toFixed(2) // mengembalikan nilai total menjadi nilaidesimal 
  }
  const calculateTotalBayar = () => {
    const totalBayar = totalShippingCost + calculateTotal();
    const totalBayarNumber = Number(totalBayar); // Konversi nilai ke tipe data Number
    return totalBayarNumber.toFixed(2);// mengembalikan nilai total menjadi nilaidesimal 
  }

  const calculatePPN = () => {
    const subtotal = calculateSubtotal()
    const ppn = subtotal * 0.11 // menghitung nilai ppn (11% dari subtotal)
    return ppn.toFixed(2) // mengembalikan nilai total menjadi nilaidesimal 
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let url = 'http://localhost:3100/product-carts'
      axios({ url, headers: { access_token: accessToken } })
        .then(async ({ data }) => {
          setCarts(data)

        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [])

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
    const selectedProvinceId = event.target.value;
    // Fetch cities data based on the selected province
    // console.log(selectedProvinceId, 'TEST');
    try {
      const response = await axios.get(
        `http://localhost:3100/users/city/${selectedProvinceId}`,
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      setCity(response.data.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  const handlerGetCost = async (event) => {
    let access_token = localStorage.getItem("access_token");
    const selectedCityId = event.target.value;
    let query = { destination: selectedCityId, courier };
    let url = `http://localhost:3100/users/cost`;
    let { data } = await axios({
      url,
      params: query,
      headers: { access_token },
    });
    setPengiriman(data);

    // Assuming that the first shipping cost is selected by default, you can update this logic as needed.
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
    console.log(value, 'valuvalue');
  };


  const handlerSetCourier = async (event) => {
    const courier = event.target.value;
    setCourier(courier);
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
                {carts?.map(e => (
                  < div class="cart-item" >
                    <div class="cart-product">
                      <img src={e.product.image} alt={e.product.image} />
                      <div>
                        <h3>{e.product.name}</h3>
                        <p>{e.product.description}</p>
                        <button onClick={() => handlerRemove(e.id)}>Remove</button>
                      </div>
                    </div>
                    <div class="cart-product-price">Rp.{e.product.unitPrice}</div>
                    <div class="cart-product-quantity">
                      <button onClick={() => handlerDec(e.id)}>-</button>
                      <div class="count">{e.quantity}</div>
                      <button onClick={() => handlerInc(e.id)}>+</button>
                    </div>
                    <div class="cart-product-total-price">Rp.{e.quantity * e.product.unitPrice}</div>
                  </div>
                ))}
              </div>
              <div class="cart-summary">
                <button class="clear-cart" onClick={() => handlerClear()}>Clear Cart</button>
                <div class="cart-checkout" style={{ lineHeight: "30px" }} >
                  <div class="subtotal">
                    <span>Subtotal :</span>
                    <span class="amount">Rp.{calculateSubtotal()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic' }}>
                    <span>PPN 11% :</span>
                    <span className="amount" > Rp. {calculatePPN()}</span>
                  </div>
                  <div class="subtotal">
                    <span>Total :</span>
                    <span style={{ fontWeight: '700' }} class="amount">{calculateTotal()}</span>
                  </div>

                  {/* <div class="start-shopping">
                  <a href="/productlist">
                    <span>&lt;</span>
                    <span>Continue Shopping</span>
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          )}
        </div >
        <div
          className="calcongkir"
          style={{ position: "relative", top: "-5px", marginBottom: "5px" }}
        >
          <h2>Pilih Metode Pengiriman</h2>
          <div>
            <select
              name="province"
              id="province"
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {province.map((item) => (
                <option key={item.province_id} value={item.province_id}>
                  {item.province}
                </option>
              ))}
            </select>
            <select name="city" id="city" onChange={handlerGetCost}>
              <option value="">Select City</option>
              {Array.isArray(city) &&
                city.map((item) => (
                  <option key={item.city_id} value={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
            </select>
            <select onChange={handlerSetCourier}>
              <option value="jne">jne</option>
              <option value="tiki">tiki</option>
              <option value="pos">pos</option>
            </select>
            {pengiriman ? pengiriman.map((el, index) => (
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
            )) : null}

          </div>
        </div>
        <div
          style={{ textAlign: "end", padding: "20px 65px", fontSize: "20px" }}
        >
          <span>Total Bayar : </span>
          <span style={{ fontWeight: "700" }} className="amount">
            Rp. {calculateTotalBayar()}
          </span>
          <button onClick={() => process()}>Payment</button>
        </div>
      </div>

    </div>
  );
}

export default Index;
