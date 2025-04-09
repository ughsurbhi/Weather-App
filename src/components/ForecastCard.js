import React from 'react';

const ForecastCard = ({ data }) => {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {data.list.filter((_, i) => i % 8 === 0).map((item, index) => (
          <div className="forecast-item" key={index}>
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
            <p>{item.main.temp} °C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;