import React from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

const DetailsTransaction = ({ onClose, children }) => {
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default DetailsTransaction;
