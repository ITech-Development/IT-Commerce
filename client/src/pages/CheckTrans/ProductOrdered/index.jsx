import React from "react";
import { Link } from "react-router-dom";

function ProductOrdered({
  carts,
  handlerRemove,
  calculateSubtotal,
  calculateVoucher,
  calculatePPN,
  calculateTotal,
}) {

    function formatPrice(price) {
        const priceString = price.toString();
        const parts = priceString.split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
  return (
    <div>
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
                <div class="checkTrans-item">
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
                      <button
                        className="butRemove"
                        onClick={() => handlerRemove(e.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div class="cart-product-price">
                    Rp.{e.product.unitPrice.toLocaleString("id-ID", {})}
                  </div>{" "}
                  <div class="cart-product-quantityIR">
                    <div class="count">
                      x {e.quantity.toLocaleString("id-ID", {})}
                    </div>
                  </div>
                  <div class="checkTrans-product-total-price">
                      Rp.
                      {/* {e.quantity * e.product.unitPrice} */}
                      {(e.quantity * e.product.unitPrice).toLocaleString(
                        "id-ID",
                        {}
                      )}
                    </div>
                </div>
              ))}
            </div>
            <div class="cart-summary">
              <p></p>
              <div class="cart-checkout">
                <div class="subtotal">
                <span className="subtot">Subtotal :</span>
                <span class="amountSub">
                      Rp. {formatPrice(calculateSubtotal())}
                    </span>                </div>
                    <div class="subtotalVou">
                    <span className="subtotVou">Voucher 6% :</span>
                    <span class="amountSub">
                      Rp. {formatPrice(calculateVoucher())}
                    </span>
                  </div>
                  <div className="ppn">
                    <span className="subtot">PPN 11% :</span>
                    <span className="amountSub">
                      Rp. {formatPrice(calculatePPN())}
                    </span>
                  </div>
                  <div class="Total">
                    <span className="subtot">Total :</span>
                    <span style={{ fontWeight: "700" }} class="amountTot">
                      Rp.
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductOrdered;
