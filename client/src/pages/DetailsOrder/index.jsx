import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CheckoutProductsPage.css";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import Logo from "../../assets/Logoss.png";
import { useGetMeQuery } from "../../features/user/apiUser";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const invoiceRef = useRef(null);
  const { data: me } = useGetMeQuery();
  const [deliveryStatus, setDeliveryStatus] = useState("");

  const handleDeliveryStatusChange = () => {
    // Set the delivery status directly since there's only one option
    setDeliveryStatus("Pesanan diterima");

    // Send the HTTP request immediately after changing the status
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
    ).then((response) => {
      if (response.status === 201) {
        console.log("ok, berhasil");
      } else {
        alert("error");
      }
    });
  };

  function calculateTotalPcs(products) {
    if (!Array.isArray(products)) {
      return 0; // Return 0 jika input bukanlah sebuah array
    }

    // Hitung total Pcs dengan menjumlahkan jumlah masing-masing produk
    const totalPcs = products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    return totalPcs;
  }

  function calculateTotalPrice(products) {
    if (!Array.isArray(products)) {
      return 0; // Return 0 if the input is not an array
    }

    // Calculate the total price by summing the price of each product
    const totalPrice = products.reduce((total, product) => {
      const productPrice = product.quantity * product.product.unitPrice;
      return total + productPrice;
    }, 0);

    return totalPrice;
  }

  function calculateTotalWeight(products) {
    if (!Array.isArray(products)) {
      return 0; // Return 0 jika input bukanlah sebuah array
    }

    // Hitung total berat (gr) dengan menjumlahkan berat masing-masing produk
    const totalWeight = products.reduce((total, product) => {
      return total + product.product.weight;
    }, 0);

    return totalWeight;
  }

  function calculateTotalDiscount(products) {
    if (!Array.isArray(products)) {
      return 0; // Return 0 if the input is not an array
    }

    // Calculate the total discount by summing the discount of each product
    const totalDiscount = products.reduce((total, product) => {
      // Calculate the discount for each product (3% of the product's unit price)
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching checkout products:", error);
      }
    }

    fetchCheckoutProducts();
  }, [id]);

  // function downloadInvoiceAsPDF() {
  //   if (invoiceRef.current) {
  //     html2canvas(invoiceRef.current).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm");
  //       const pdfWidth = 210;
  //       const pdfHeight = pdf.internal.pageSize.height;
  //       const position = 0;
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //       pdf.save("invoice.pdf");
  //     });
  //   }
  // }

  function downloadInvoiceAsPDF() {
    if (invoiceRef.current) {
      // Buat objek jspdf dalam potrait mode
      const pdf = new jsPDF("p", "mm");

      // Tambahkan gambar latar belakang
      const img = new Image();
      img.src = Logo; // Ganti dengan gambar latar belakang yang diinginkan
      pdf.addImage(img, "JPEG", 0, 0, 210, 297); // Sesuaikan ukuran gambar dan posisinya

      // Simpan data invoice dalam dokumen PDF
      pdf.fromHTML(invoiceRef.current, 15, 15); // Sesuaikan posisi

      // Simpan PDF dengan nama "invoice.pdf"
      pdf.save("invoice.pdf");
    }
  }

  if (loading) {
    return <p className="dataInvoice">Loading...</p>;
  }

  function copyToClipboard() {
    const trackingNumber = checkoutProducts[0].checkout.trackingNumber;
    if (trackingNumber) {
      // Buat elemen input sementara untuk menyalin teks ke clipboard
      const tempInput = document.createElement("input");
      tempInput.value = trackingNumber;
      document.body.appendChild(tempInput);

      // Pilih teks dalam elemen input
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // Untuk kompatibilitas peramban

      // Salin teks ke clipboard
      document.execCommand("copy");

      // Hapus elemen input sementara
      document.body.removeChild(tempInput);

      // Tampilkan pesan sukses (opsional)
      alert("Nomor Resi telah disalin ke clipboard: " + trackingNumber);
    }
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
            Tanggal Pembelian : {checkoutProducts[0].createdAt}
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
                <p>Berat: {checkoutProduct.product.weight}</p>
              </td>
              <td>{checkoutProduct.quantity}</td>
              <td>Rp. {checkoutProduct.product.unitPrice}</td>
              <td>
                Rp.{" "}
                {checkoutProduct.quantity * checkoutProduct.product.unitPrice}
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
              Rp. {checkoutProducts[0].checkout.shippingCost}
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
            {checkoutProducts[0].checkout.trackingNumber === null
              ? "null"
              : checkoutProducts[0].checkout.trackingNumber}
            <span
              style={{ cursor: "pointer" }}
              className="copy-icon"
              onClick={copyToClipboard}
            >
              📋
            </span>
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
      <button className="download-button" onClick={downloadInvoiceAsPDF}>
        Download Invoice as PDF
      </button>

      {checkoutProducts[0].checkout.deliveryStatus === "Dikirim" && (
        <div>
          <br />
          {/* <label htmlFor="deliveryStatus">Delivery Status:</label> */}
          <button className="download-button" type="button" onClick={handleDeliveryStatusChange}>
            Pesanan diterima
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutProductsPage;
