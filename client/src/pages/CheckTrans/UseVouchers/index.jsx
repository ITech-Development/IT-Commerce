import React from 'react'

function UseVouchers({ voucherCode, setVoucherCode, applyVoucher }) {
    return (
        <div>
            <h2>Masukan Kode Voucher</h2>
            <div>
                <input
                    type="text"
                    placeholder="Masukkan kode voucher"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button onClick={applyVoucher}>Apply</button>
            </div>
        </div>
    )
}

export default UseVouchers