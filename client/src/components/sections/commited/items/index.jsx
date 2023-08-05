import React from "react";
import Quality from "../../../../assets/highQuality.png";
import Cerdas from "../../../../assets/cerdas.png";
import Dukungan from "../../../../assets/dukungan.png";
import Response from "../../../../assets/response.png";
import Support from "../../../../assets/support24.png";
import TransactionPrac from "../../../../assets/transactionpraktis.png";
import "../commitStyle.css";

export default function index() {
  return (
    <div className="commited">
      <div className="card-items">
        <div className="card-icon">
          <img src={Quality} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Kualitas Tinggi</h3>
          <p>
            Diproduksi dengan standar ketat dan mengikuti regulasi industri
            terkini. Setiap produk kami melalui serangkaian uji kualitas untuk
            memastikan keandalan dan daya tahan luar biasa.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Support} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Bantuan 24/7</h3>
          <p>
            Membantu Anda 24 jam sehari, 7 hari seminggu. Layanan bantuan kami
            siap sedia menanggapi setiap kebutuhan Anda, kapan pun dan di mana
            pun Anda berada.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={TransactionPrac} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Transaksi Praktis</h3>
          <p>
            Segala sesuatu menjadi lebih mudah. Cukup buka perangkat seluler
            Anda atau duduk di depan komputer, dan Anda dapat dengan mudah
            mengakses layanan kami kapan saja dan di mana saja.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Cerdas} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Pengadaan yang Cerdas</h3>
          <p>
            Pengadaan produk yang cepat, tanggap dan sesuai dengan kebutuhan
            serta mudah didapat. Kami menyediakan produk-produk sparepart diesel
            dengan menganalisis kebutuhan pasar untuk membantu anda.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Response} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Respon Cepat</h3>
          <p>
            Dengan layanan respon cepat kami, Anda memiliki solusi tepat dalam
            sekejap. Percayakan kebutuhan Anda kepada kami, dan nikmati
            kemudahan dan kepuasan yang kami hadirkan.
          </p>
        </div>
      </div>
      <div className="card-items">
        <div className="card-icon">
          <img src={Dukungan} alt="" className="card-image" />
        </div>
        <div className="card-content">
          <h3>Dukungan Teknologi</h3>
          <p>
            Sistem Manajemen Stok yang Canggih, Platform E-Commerce yang
            Responsif, Analitik Data untuk Pengambilan Keputusan Cerdas, Layanan
            Pelanggan yang Responsif
          </p>
        </div>
      </div>
    </div>
  );
}
