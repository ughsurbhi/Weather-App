import React from 'react';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{weather[0].main}</p>
      <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="icon" />
      <p>Temp: {main.temp} °C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;