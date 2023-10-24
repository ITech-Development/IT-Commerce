import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const PaymentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Konfirmasi Pembayaran</h3>
        <div id="snap-container"></div>
        <Link to='/'>
        <Button>Sudah Bayar dan Kembali</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentModal;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
`