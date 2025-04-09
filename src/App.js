import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import './App.css';
import { motion } from 'framer-motion';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem('recentCities')) || [];
  });
  const [theme, setTheme] = useState('light');

  const API_KEY = 'f0ad9de1e26ff97eb11ac02396c0d150';

  const fetchWeather = async (searchCity = city) => {
    if (!String(searchCity).trim()) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastRes.data);

      updateRecentSearches(searchCity);
    } catch (err) {
      setError('City not found or API error.');
      setWeatherData(null);
      setForecastData(null);
    }
    setLoading(false);
  };

  const updateRecentSearches = (searchCity) => {
    let updated = [searchCity, ...recentSearches.filter(c => c !== searchCity)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentCities', JSON.stringify(updated));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Weather Dashboard 🌤️</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Theme
      </button>
      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
      <div className="recent">
        {recentSearches.map((item, idx) => (
          <button key={idx} onClick={() => fetchWeather(item)}>{item}</button>
        ))}
      </div>
      <button className="refresh-btn" onClick={() => fetchWeather()}>🔄 Refresh</button>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <WeatherCard data={weatherData} />
        </motion.div>
      )}
      {forecastData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ForecastCard data={forecastData} />
        </motion.div>
      )}
    </div>
  );
};

export default App;
