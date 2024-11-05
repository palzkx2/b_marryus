import React from 'react';

const WeatherDisplay = ({ weather }) => {
  return (
    <div className="weather-display">
      <h2>Weather Forecast</h2>
      <p><strong>Temperature:</strong> {weather.avgtemp_c}°C</p>
      <p><strong>Condition:</strong> {weather.condition.text}</p>
      <img src={weather.condition.icon} alt="weather icon" />
    </div>
  );
};

export default WeatherDisplay;
