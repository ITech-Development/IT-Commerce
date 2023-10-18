import React from 'react';

const PaymentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Konfirmasi Pembayaran</h2>
        {/* Tambahkan konten modal sesuai kebutuhan */}
        <div id="snap-container"></div>
        <p>Silakan lakukan pembayaran.</p>
      </div>
    </div>
  );
};

export default PaymentModal;
