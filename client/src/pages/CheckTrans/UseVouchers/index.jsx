import React from "react";

function UseVouchers({ voucherCode, setVoucherCode, applyVoucher }) {
  return (
    <div>
      <h3 className="kodeVouc">Pilih Kode Voucher</h3>
      <p className="contentVouc">
        Silahkan pilih kode voucher dibawah untuk mendapatkan potongan belanja
        6%!
      </p>
      <div class="voucher-container">
        <input
          class="voucher-input"
          type="text"
          placeholder="Masukkan kode voucher"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button class="apply-button" onClick={applyVoucher}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default UseVouchers;
