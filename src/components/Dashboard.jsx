import React, { useState, useEffect } from 'react';
import SeekBar from './seekbar';

const Dashboard = ({ city }) => {
  // State to store weather data
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch weather and AQI data when the component mounts or city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=de359faa955eafd9c96d96368bdb502f&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
        
        // Fetching AQI data based on the latitude and longitude of the city
        const { lat, lon } = weatherData.coord;
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=de359faa955eafd9c96d96368bdb502f`
        );
        if (!aqiResponse.ok) {
          throw new Error('Failed to fetch AQI data');
        }
        const aqiData = await aqiResponse.json();
        setAqi(aqiData.list[0].main.aqi); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alert('Please enter a valid city name.');
  }

  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from UNIX timestamp to milliseconds
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust hours to 12-hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex items-center justify-center mx-auto h-auto relative flex-col md:flex-row w-[90vw] md:w-[70vw]">


      


      <div className="w-[100%]">
        <p className="text-center text-slate-300 font-normal text-[1rem] p-1">{weather.name}</p>
        <h3 className="m-2 md:m-4 text-white font-medium text-3xl md:text-3xl mx-auto text-center">{Math.trunc(weather.main.temp)} °C</h3>
        <p className="text-center text-slate-300 font-normal text-[1rem] p-1">{weather.weather[0].description}</p>

        <ul className="flex text-white text-[.8rem] md:text-sm justify-around items-center list-none w-[100%] m-3">
          <li className="flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
            </svg>
            {weather.wind.speed} km/hr
          </li>
          <li className="flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
            </svg>
            {weather.main.humidity} %
          </li>
          <li className="flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
            </svg>
            {weather.main.pressure} mb
          </li>
        </ul>
        <p>Sunrise: {convertTime(weather.sys.sunrise)}</p>
        <p>Sunset: {convertTime(weather.sys.sunset)}</p>

        {/* Render SeekBar component with the AQI */}
        {aqi && <SeekBar aqi={aqi} />}
      </div>
    </div>
  );
};

export default Dashboard;
