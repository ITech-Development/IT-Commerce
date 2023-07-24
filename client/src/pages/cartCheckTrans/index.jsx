import { useDispatch, useSelector } from "react-redux";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getTotals } from "../../features/cartSlice";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'

const Cart = () => {

  let [carts, setCarts] = useState([])
  console.log(carts, 'testtttttttttttcart');
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [token, setToken] = useState('')

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
    const total = subtotal + ppn // menghitung total(subtotal + ppn)
    return total.toFixed(2) // mengembalikan nilai total menjadi nilaidesimal 
  }

  const calculatePPN = () => {
    const subtotal = calculateSubtotal()
    const ppn = subtotal * 0.11 // menghitung nilai ppn (11% dari subtotal)
    return ppn.toFixed(2)
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


  return (
    <>
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
                    <Link to={`/products/${e.product.id}`}>
                      <img src={e.product.image} alt={e.product.name} />
                    </Link>
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
                <button onClick={() => process()}>midtrans</button>
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
    </>
  );
};

export default Cart;