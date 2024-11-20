import React, { useState, useEffect } from 'react';

const Dashboard = ({ city }) => {
  // State to store weather data
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = process.env.VITE_OPEN_WEATHER_API || import.meta.env.VITE_OPEN_WEATHER_API

  // Fetch weather data when the component mounts or city changes
  useEffect(() => {
    const weatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    weatherData();
  }, [city]); // Run this effect when the city prop changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center mx-auto h-auto relative flex-col md:flex-row">
      <div>
        <p>City: {weather.name}</p>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Humidity: {weather.main.humidity}%</p>
      </div>
    </div>
  );
};

export default Dashboard;
