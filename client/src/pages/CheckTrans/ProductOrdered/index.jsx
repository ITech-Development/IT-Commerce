import React from 'react'
import { Link } from 'react-router-dom'


function ProductOrdered({ carts, handlerRemove, calculateSubtotal, calculateVoucher, calculatePPN, calculateTotal }) {
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
                                    <span>Subtotal :</span>
                                    <span class="amount">Rp.{calculateSubtotal()}</span>
                                </div>
                                <div class="subtotal">
                                    <span>Voucher 6% :</span>
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
        </div>
    )
}

export default ProductOrdered