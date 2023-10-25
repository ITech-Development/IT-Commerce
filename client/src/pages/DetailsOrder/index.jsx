import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CheckoutProductsPage.css";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import Logo from "../../assets/Logoss.png";

function CheckoutProductsPage() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const invoiceRef = useRef(null);

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
          <p className="dataInvoice">Penjual : Product Owner</p>
        </div>
        <div>
          <h5>UNTUK</h5>
          <p className="dataInvoice">Pembeli : </p>
          <p className="dataInvoice">Tanggal Pembelian : </p>
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
                <p>Berat: </p>
              </td>
              <td>{checkoutProduct.quantity}</td>
              <td>Rp. {checkoutProduct.price}</td>
              <td>Rp. {checkoutProduct.totalPrice}</td>
              {/* <td>{checkoutProduct.createdAt}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sec3Inovice">
        <p className="dataInvoice1"></p>
        <div className="sec3Right">
          <div className="contentSec31">
            <p className="dataInvoice1Total">TOTAL HARGA (2 Pcs)</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Total Ongkos Kirim (10 gr)</p>
            <p className="dataInvoice1">Rp. Harga</p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Diskon Ongkos Kirim</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Total Diskon Barang</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="contentSec3">
            <p className="dataInvoice1">Biaya Asuransi Pengiriman</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="content1Sec3">
            <p className="dataInvoice1Total">TOTAL BELANJA</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="content2Sec3">
            <p className="dataInvoice1Total">TOTAL TAGIHAN</p>
            <p className="dataInvoice1">Rp. harga</p>
          </div>
          <div className="content3Sec3">
            <p className="dataInvoice1promo">Promo Donik</p>
            <div className="isiContentSec3">
              <p className="dataInvoice1">Diskon Belanja 3%</p>
              <p className="dataInvoice1">Rp. harga</p>
            </div>
          </div>
        </div>
      </div>
      <div className="kurirInvoice4">
        <div>
          <p className="dataInvoice1">Kurir :</p>
          <p className="dataInvoice1" style={{ color: "black" }}>
            JNE
          </p>
        </div>
        <div>
          <p className="dataInvoice1">Metode Pembayaran :</p>
          <p className="dataInvoice1" style={{ color: "black" }}>
            BCA
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
            Terakhir diupdate: tanggal belanja dan jam
          </p>
        </div>
      </div>
      <button className="download-button" onClick={downloadInvoiceAsPDF}>
        Download Invoice as PDF
      </button>
    </div>
  );
}

export default CheckoutProductsPage;
