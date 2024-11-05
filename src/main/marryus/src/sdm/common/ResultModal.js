import React from 'react';
import './sdmmodal.css'


const ResultModal = ({ message, onClose }) => {
    return (
      <div className="sdmmodal">
        <div className="sdmmodal-content">
            <p>{message}</p>
            <button onClick={onClose}>닫기</button>
        </div>
  </div> 
    );
};

export default ResultModal;