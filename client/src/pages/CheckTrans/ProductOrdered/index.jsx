import React from 'react'
import { Link } from 'react-router-dom'


function ProductOrdered({ carts, handlerRemove, calculateAfterPPN, calculateVoucher, calculateTotal, isPickupInStore, calculateBeforePPN, totalShippingCost }) {
    function calculatePickupInStore() {
        // Menghitung biaya "Pick Up In Store" jika dipilih
        if (isPickupInStore) {
            // Gantilah nilai 0 dengan biaya "Pick Up In Store" yang sesuai
            const pickupInStoreFee = calculateAfterPPN() * 0.11;
            return pickupInStoreFee;
        }
        return 0;
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
                                    <span>Total Harga <i>(Belum termasuk PPN)</i>: </span>
                                    <span class="amount">Rp.{calculateBeforePPN()}</span>
                                </div>
                                <div class="subtotal">
                                    <span>Total PPN <i>(11%)</i>:</span>
                                    <span class="amount">Rp.{calculateAfterPPN() - calculateBeforePPN()}</span>
                                </div>
                                <div class="subtotal">
                                    <span>Voucher: </span>
                                    <span class="amount">Rp.{calculateVoucher()}</span>
                                </div>


                                {!isPickupInStore ? (
                                    <div class="subtotal">
                                        <span>Total Ongkos Kirim:</span>
                                        <span class="amount">Rp.{totalShippingCost}</span>
                                    </div>
                                ) : (
                                    <div class="subtotal">
                                        <span>Ambil di Toko:</span>
                                        <span class="amount">Rp.{calculatePickupInStore()}</span>
                                    </div>
                                )}
                                <div class="subtotal">
                                    <span>Total Harga <i>(Sudah termasuk PPN)</i>: </span>
                                    <span class="amount">Rp.{calculateAfterPPN()}</span>
                                </div>
                                {/* <div class="subtotal">
                                    <span>Total: </span>
                                    <span style={{ fontWeight: "700" }} class="amount">
                                    Rp.{calculateTotal()}
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductOrdered