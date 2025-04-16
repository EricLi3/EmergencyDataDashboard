import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherBanner.css"; // Add some styling

const WeatherBanner = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("https://api.weather.gov/gridpoints/SJU/103,95/forecast");
        const data = response.data;
        if (data && data.properties && data.properties.periods) {
          setWeather(data.properties.periods[0]); // Get the current weather period
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to fetch weather updates.");
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="weather-banner error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-banner loading">Loading weather updates...</div>;
  }

  return (
    <div className="weather-banner">
      <h2>San Juan, Puerto Rico Weather</h2>
      <p>
        <strong>{weather.name}:</strong> {weather.detailedForecast}
      </p>
      <p>
        <strong>Temperature:</strong> {weather.temperature}°{weather.temperatureUnit}
      </p>

      <br />
    </div>
  );
};

export default WeatherBanner;
