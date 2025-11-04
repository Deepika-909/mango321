import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getHistoricalWeather } from '../services/weatherService';
import WeatherChart from './WeatherChart';

const WeatherDisplay = () => {
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchWeather = async () => {
    const data = await getCurrentWeather(city);
    setWeather(data);
    const { lat, lon } = data.coord;
    const now = Math.floor(Date.now() / 1000);
    const days = await Promise.all([...Array(5)].map((_, i) =>
      getHistoricalWeather(lat, lon, now - i * 86400)
    ));
    setHistory(days);
  };

  useEffect(() => { fetchWeather(); }, [city]);

  return (
    <div>
      <input value={city} onChange={e => setCity(e.target.value)} />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <p>Temp: {(weather.main.temp - 273.15).toFixed(1)} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
      <WeatherChart data={history} />
    </div>
  );
};

export default WeatherDisplay;
