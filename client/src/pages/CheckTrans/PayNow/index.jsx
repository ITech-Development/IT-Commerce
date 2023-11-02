import React, { useState, useEffect } from "react";
import "../styless.css";
import axios from "axios";
import {
    useClearProductCartMutation,
    useGetCartsQuery,
    useRemoveItemFromCartMutation
} from "../../../features/cart/apiCarts";
import { useGetMeQuery } from "../../../features/user/apiUser";
import PaymentModal from '../PaymentModal';
import ShippingAddress from "../ShippingAddress";
import UseVouchers from "../UseVouchers";
import ShippingMethod from "../ShippingMethod";
import ProductOrdered from "../ProductOrdered";

const validVoucherCodes = ["DM01", "IT01", "MS01"];

function PayNow() {

    const { data: carts } = useGetCartsQuery()
    const { data: profile } = useGetMeQuery()
    const [removeItemFromCart] = useRemoveItemFromCartMutation()
    const [clearItemFromCart] = useClearProductCartMutation()

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const [voucherCode, setVoucherCode] = useState(""); // State for the voucher code input
    const [isVoucherValid, setIsVoucherValid] = useState(false); // Flag to track voucher code validity

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


    const handlePaymentProcess = async (data) => {
        const bayar = calculateTotalBayar();
        const pajak = calculatePPN()
        const config = {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
        };

        let params = { total: bayar };
        const response = await axios({
            url: `http://localhost:3100/midtrans/itech`,
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

        const midtransClientKey = "Mid-client-O4jQIpz7nFgHIY3h";
        scriptTag.setAttribute("data-client-key-indo-itech", midtransClientKey);

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

    return (
        <div>
            <ShippingAddress profile={profile} />

            <div
                className="alamat"
                style={{ marginTop: "20px", marginBottom: "20px" }}
            >
                <h2>Produk Dipesan</h2>
                {/* <CartCheckTrans /> */}
                <ProductOrdered
                    carts={carts}
                    handlerRemove={handlerRemove}
                    calculateSubtotal={calculateSubtotal}
                    calculateVoucher={calculateVoucher}
                    calculatePPN={calculatePPN}
                    calculateTotal={calculateTotal}
                />

                <div>
                    <UseVouchers voucherCode={voucherCode} setVoucherCode={setVoucherCode} applyVoucher={applyVoucher} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ShippingMethod
                        courier={courier}
                        handlerSetCourier={handlerSetCourier}
                        handleProvinceChange={handleProvinceChange}
                        province={province}
                        handleCityChange={handleCityChange}
                        city={city}
                        handlerGetCost={handlerGetCost}
                        subdistrict={subdistrict}
                        pengiriman={pengiriman}
                        selectedShippingCost={selectedShippingCost}
                        handleShippingCostChange={handleShippingCostChange}
                    />


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
                        {/* Tampilkan modal jika isModalOpen adalah true */}
                        <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PayNow;