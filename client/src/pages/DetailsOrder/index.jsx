import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CheckoutProductsPage.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../../assets/Logoss.png";
import { useGetMeQuery } from "../../features/user/apiUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const invoiceRef = useRef(null);
  const { data: me } = useGetMeQuery();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [userId, setUserId] = useState(me ? me.id : "");

  const [incrementValue, setIncrementValue] = useState(0);

  // const [message, setMessage] = useState("");

  // const handleIncrement = () => {
  //   const incrementValueInt = parseInt(incrementValue, 10);
  //   fetch(
  //     `https://indoteknikserver-732012365989.herokuapp.com/users/incrementPurchasePoints/${userId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         access_token: localStorage.getItem("access_token"),
  //       },
  //       body: JSON.stringify({ incrementValue: incrementValueInt }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((error) => console.error(error));
  // };

  const handleDeliveryStatusChange = () => {
    setDeliveryStatus("Pesanan diterima");
    fetch(
      `https://indoteknikserver-732012365989.herokuapp.com/checkouts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ deliveryStatus: "Pesanan diterima" }),
      }
    ).then(async (response) => {
      if (response.status === 201) {
        const incrementValueInt = parseInt(incrementValue, 10);
        const incrementResponse = await fetch(
          `https://indoteknikserver-732012365989.herokuapp.com/users/incrementPurchasePoints/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              access_token: localStorage.getItem("access_token"),
            },
            body: JSON.stringify({ incrementValue: incrementValueInt }),
          }
        );
        if (incrementResponse.status === 200) {
          console.log(
            "Delivery status updated and points incremented successfully."
          );
        } else {
          console.error("Error incrementing points.");
        }
      } else {
        console.error("Error updating delivery status.");
      }
    });
  };

  function calculateTotalPcs(products) {
    if (!Array.isArray(products)) {
      return 0;
    }

    const totalPcs = products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    return totalPcs;
  }

  function calculateTotalPrice(products) {
    if (!Array.isArray(products)) {
      return 0;
    }

    const totalPrice = products.reduce((total, product) => {
      const productPrice = product.quantity * product.product.unitPrice;
      return total + productPrice;
    }, 0);

    return totalPrice;
  }

  function calculateTotalWeight(products) {
    if (!Array.isArray(products)) {
      return 0;
    }

    const totalWeight = products.reduce((total, product) => {
      return total + product.product.weight;
    }, 0);

    return totalWeight;
  }

  function calculateTotalDiscount(products) {
    if (!Array.isArray(products)) {
      return 0;
    }

    const totalDiscount = products.reduce((total, product) => {
      const productDiscount =
        0.03 * product.product.unitPrice * product.quantity;
      return total + productDiscount;
    }, 0);

    return totalDiscount;
  }

  useEffect(() => {
    async function fetchCheckoutProducts() {
      try {
        const response = await axios.get(
          `https://indoteknikserver-732012365989.herokuapp.com/checkout-products/${id}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        setCheckoutProducts(response.data);
        setIncrementValue(calculateTotalPrice(response.data) / 1000);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching checkout products:", error);
      }
    }

    fetchCheckoutProducts();
  }, [id]);

  function downloadInvoiceAsPDF() {
    if (invoiceRef.current) {
      const pdf = new jsPDF("p", "mm", "a4");

      // Tentukan margin halaman
      const margin = 1;

      // Hitung lebar dan tinggi halaman berdasarkan margin
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

      // Convert HTML element to canvas
      html2canvas(invoiceRef.current).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");

        // Hitung ukuran gambar yang akan dimasukkan ke PDF
        let imgWidth = pageWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Jika gambar terlalu tinggi untuk muat dalam halaman, perbesar gambar
        if (imgHeight > pageHeight) {
          const ratio = pageHeight / imgHeight;
          imgWidth *= ratio;
          imgHeight = pageHeight;
        }

        // Tentukan posisi tengah halaman
        const x = margin + (pageWidth - imgWidth) / 14;
        const y = margin + (pageHeight - imgHeight) / 14;

        // Tambahkan gambar yang telah diubah ke PDF
        pdf.addImage(imageData, "PNG", x, y, imgWidth, imgHeight);

        // Trigger unduhan PDF dengan nama "invoice.pdf"
        pdf.save("invoice.pdf");
      });
    }
  }

  if (loading) {
    return <p className="dataInvoice">Loading...</p>;
  }

  const purchaseDate = new Date(checkoutProducts[0].createdAt);

  // Mengambil komponen tanggal, bulan, dan tahun
  const day = purchaseDate.getDate();
  const month = purchaseDate.toLocaleString("default", { month: "long" }); // Bulan dalam format teks
  const year = purchaseDate.getFullYear();

  // Mengambil jam dan menit
  const hours = purchaseDate.getHours();
  const minutes = purchaseDate.getMinutes();

  // Format waktu dalam AM/PM
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 24 || 12; // Ubah 0 menjadi 12 untuk jam 12:xx PM

  // Buat tampilan yang lebih sederhana dan rapi
  const formattedPurchaseDate = `${day} ${month} ${year}, ${formattedHours}:${minutes} ${amPm}`;

  function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Kode Resi disalin ke clipboard");
  }
  return (
    <div className="checkout-page" ref={invoiceRef}>
      <div className="invoice-header">
        <img className="logoInvoice" src={Logo} alt="" />
        <div className="invoice-details">
          <p className="dataInvoice">
            <strong>INVOICE</strong>
            <br />
            <span className="kodeInvoice">
              {checkoutProducts[0].checkout.midtransCode}
            </span>
          </p>
        </div>
      </div>
      <div className="sec2Invoice">
        <div>
          <h5>DITERBITKAN ATAS NAMA</h5>
          <p className="dataInvoice">
            Penjual : {checkoutProducts[0].product.product_owners.name}
          </p>
        </div>
        <div>
          <h5>UNTUK</h5>
          <p className="dataInvoice">Pembeli : {me?.fullName}</p>
          <p className="dataInvoice">
            Tanggal Pembelian : {formattedPurchaseDate}
          </p>
          <p className="dataInvoice">
            Alamat Pengiriman : {checkoutProducts[0].checkout.shippingAddress}
          </p>
        </div>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>INFO PRODUK</th>
            <th>JUMLAH</th>
            <th>HARGA SATUAN</th>
            <th>TOTAL HARGA</th>
            {/* <th>Belanja Pada</th> */}
          </tr>
        </thead>
        <tbody>
          {checkoutProducts.map((checkoutProduct, index) => (
            <tr key={index}>
              <td>
                <p className="dataInvoiceName">
                  {checkoutProduct.product.name}
                  <br />
                </p>
                <p>
                  Berat:{" "}
                  {checkoutProduct.product.weight.toLocaleString("id-ID", {})}
                </p>
              </td>
              <td>{checkoutProduct.quantity}</td>
              <td>
                Rp.{" "}
                {checkoutProduct.product.unitPrice.toLocaleString("id-ID", {})}
              </td>
              <td>
                Rp.{" "}
                {(
                  checkoutProduct.quantity * checkoutProduct.product.unitPrice
                ).toLocaleString("id-ID", {})}
              </td>
              {/* <td>{checkoutProduct.createdAt}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sec3Inovice">
        <p className="dataInvoice1"></p>
        <div className="sec3Right">
          <div className="contentSec31">
            <p className="dataInvoice1Total">
              TOTAL HARGA ({calculateTotalPcs(checkoutProducts)} Pcs)
            </p>
            <p className="dataInvoice1">
              Rp. {calculateTotalPrice(checkoutProducts)}
            </p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">
              Total Ongkos Kirim ({calculateTotalWeight(checkoutProducts)} gr)
            </p>
            <p className="dataInvoice1">
              Rp.{" "}
              {checkoutProducts[0].checkout.shippingCost.toLocaleString(
                "id-ID",
                {}
              )}
            </p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Diskon Ongkos Kirim</p>
            <p className="dataInvoice1">Rp. - </p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Total Diskon Barang</p>
            <p className="dataInvoice1">
              Rp. {calculateTotalDiscount(checkoutProducts)}
            </p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Biaya Asuransi Pengiriman</p>
            <p className="dataInvoice1">Rp. -</p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">PPN</p>
            <p className="dataInvoice1">
              Rp. {checkoutProducts[0].checkout.setPPN}
            </p>
          </div>
          <div className="content1Sec3">
            <p className="dataInvoice1Total">TOTAL BELANJA</p>
            <p className="dataInvoice1">
              Rp. {checkoutProducts[0].checkout.totalPrice}
            </p>
          </div>
          <div className="content2Sec3">
            <p className="dataInvoice1Total">TOTAL TAGIHAN</p>
            <p className="dataInvoice1">
              Rp. {checkoutProducts[0].checkout.totalPrice}
            </p>
          </div>
          <div className="content3Sec3">
            <p className="dataInvoice1promo">Promo Donik</p>
            <div className="isiContentSec3">
              <p className="dataInvoice1">Diskon Belanja 3%</p>
              <p className="dataInvoice1">
                Rp. {calculateTotalDiscount(checkoutProducts)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="kurirInvoice4">
        <div>
          <p className="dataInvoice1">Kurir :</p>
          <p className="dataInvoice1" style={{ color: "black" }}>
            {checkoutProducts[0].checkout.shippingMethod === null
              ? "-"
              : checkoutProducts[0].checkout.shippingMethod.toUpperCase()}
          </p>
          <p className="dataInvoice1">
            No Resi:{" "}
            {checkoutProducts[0].checkout.trackingNumber === null ? (
              "(Pesanan anda belum dikirim)"
            ) : (
              <span>
                {checkoutProducts[0].checkout.trackingNumber}
                <FontAwesomeIcon
                  icon={faCopy}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    color: "blue",
                  }}
                  onClick={() =>
                    copyToClipboard(checkoutProducts[0].checkout.trackingNumber)
                  }
                />
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="dataInvoice1">Metode Pembayaran :</p>
          <p className="dataInvoice1" style={{ color: "black" }}>
            {checkoutProducts[0].checkout.paymentMethod === null
              ? "-"
              : checkoutProducts[0].checkout.paymentMethod.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="kurir2invoice">
        <p className="dataInvoice1">
          Invoice ini sah dan diproses oleh komputer
        </p>
        <div className="kurirInvoice4s">
          <p className="dataInvoice1">
            Silahkan hubungi{" "}
            <span style={{ color: "blueviolet", fontWeight: "600" }}>
              Donik
            </span>{" "}
            apabila kamu membutuhkan bantuan
          </p>
          <p className="dataInvoice1">
            Terakhir diupdate: {checkoutProducts[0].createdAt}
          </p>
        </div>
      </div>

      {checkoutProducts[0].checkout.deliveryStatus === "Dikirim" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <button className="download-button" onClick={downloadInvoiceAsPDF}>
            Download Invoice as PDF
          </button>
          <div>
            <br />
            {/* <label htmlFor="deliveryStatus">Delivery Status:</label> */}
            <button
              className="download-button"
              type="button"
              onClick={handleDeliveryStatusChange}
            >
              Pesanan diterima
            </button>
            <p>
              Dapatkan bonus poin belanja dengan menekan tombol Pesanan diterima
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutProductsPage;
