import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); 

  const API_KEY = '3fb02874a95e8eb024ad1ebbbcb700d8';
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API_KEY}`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setData(data);
        console.log(data);
        setError('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({});
        setError(error.message);
      }
      setLocation('');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5/9;
  };

  const formatTemperature = (temperature) => {
    return unit === 'metric' ? temperature.toFixed() + '°C' : celsiusToFahrenheit(temperature).toFixed() + '°F';
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{formatTemperature(data.main.temp)}</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="unit-toggle">
        <button onClick={toggleUnit}>{unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}</button>
      </div>
        </div>
        {error && <p className="error">{error}</p>}
        {data.main && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{formatTemperature(data.main.feels_like)}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default App;


