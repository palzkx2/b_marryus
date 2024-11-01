import React from 'react';
import './paymentmodal.css'


const PaymentModal =({ message, onClose }) => {
    return (
        <div className="paymentmodal">
            <div className="paymentmodal-content">
                <p>{message}</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default PaymentModal;