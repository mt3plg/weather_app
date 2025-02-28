import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css';

import { useTranslation } from 'react-i18next';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const { t, i18n } = useTranslation();

  const API = '5e6175041ee2c0c7baf17ce60cf3aa7b';

  const fetchCurrentWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
      );

      const data = await response.json();
      if (data.cod === 200) {
        setCurrentWeather(data);
        fetchForecst(data.coord.lat, data.coord.lon);
        updateBackground(data.weather[0].main);
        setCity('');
      } else {
        alert(`city not found(`);
      }
    } catch (error) {
      console.error(`no data!`, error);
    }
  };

  const fetchForecst = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}&units=metric`//передаємо довготу і широту(лат, лон)
      );
      const data = await response.json();
      const dailyForecst = data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
      ).slice(0, 5);
      setForecast(dailyForecst);
    } catch (error) {
      console.error(`error forecst`, error);
    }
  };

  const updateBackground = (weatherType) => {
    const backgrounds = {
      Clear: 'linear-gradient(135deg, #ffd700, #ff8c00)',
      Clouds: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
      Rain: 'linear-gradient(135deg, #3498db, #2c3e50)',
      Snow: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)',
    };
    document.body.style.background = backgrounds[weatherType] || 'linear-gradient(135deg, #6b48ff, #00ddeb)';
  };

  const handleKeyPress = (e) => {
    if (e.key === `Enter`) fetchCurrentWeather();
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en');
  };

  return (
    <div className="app">
      <div className="language">
        <button className="translateBtn" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'ua' : 'en'}
        </button>
      </div>
      <h1 className="title">{t('title')}</h1>
      <a href="https://openweathermap.org" target="_blank" className="created" rel="noopener noreferrer">
        {t('createdBy')}
      </a>

      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('placeholder')}
          className="search"
        />
        <button onClick={fetchCurrentWeather} className="searchBtn">
          {t('button')}
        </button>
      </div>

      {currentWeather && (
        <div className="weatherBox">
          <h2 className="cityName">{currentWeather.name}</h2>
          <div className="tempBox">
            <p className="tempValue">{Math.round(currentWeather.main.temp)}°C</p>
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="icon"
              className="weatherIcon"
            />
          </div>
          <p className="description">{t('description')}: {currentWeather.weather[0].description}</p>
          <p className="feelsLike">{t('feelsLike')} {Math.round(currentWeather.main.feels_like)}°C</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecastContainer">
          {forecast.map((day, index) => (
            <div key={index} className="Card">
              <p className="day">{new Date(day.dt * 1000).toLocaleDateString(i18n.language === 'ua' ? 'uk-UA' : 'en-US', { weekday: 'short' })}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="Forecast icon"
                className="forecastIcon"
              />
              <p className="forecastTemp">{Math.round(day.main.temp)}°C</p>
              <p className="forecastDescription">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
