import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker 스타일링 적용
import './WeddingDatePickerStyles.css';

const WeddingDatePicker = ({ selectedDate, onDateChange }) => (
  <div className="unique-datepicker-container">
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="날짜 선택"
      className="unique-datepicker-input"
    />
  </div>
);

export default WeddingDatePicker;
