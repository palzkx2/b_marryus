import React, { useEffect, useState } from 'react';
import './WeddingSchedulerStyles.css';
import WeddingDatePicker from './WeddingDatePicker ';
import loginImg from '../../s_images/cloud-5055011_1920.jpg'
import axios from 'axios';

const WeddingScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [weather, setWeather] = useState(null);

  // 날짜 선택 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchWeather(date);
  };

  // 날씨 API를 통해 해당 날짜 날씨 조회
  const fetchWeather = (date) => {
    // 예시 API URL
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&date=${date}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeather(data.forecast.forecastday[0].day.condition.text))
      .catch((error) => console.error('날씨 정보를 가져오는데 실패했습니다:', error));
  };


  

  return (
    <div >
      <div className='alignGood'>
            <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'contain', backgroundPosition:`center calc(100% + -2px)`}}>
            </div>
      </div>

      <div className='alignGood'>
        <div className='mainContainer'>
          
          <div className="unique-wedding-scheduler">
            <h2 className="unique-wedding-title">웨딩 일정 관리</h2>
            <div className="unique-datepicker-section">
              <WeddingDatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
              {weather && <p className="unique-weather-info">날씨: {weather}</p>}
            </div> 
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeddingScheduler;
