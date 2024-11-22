import React, { useState, useEffect } from 'react';
import SeekBar from './Seekbar';
import SunArc from './SunArc';
import WeatherMetrics from './WatherMetrics';
import SkeletonLoader from './SkeletonLoader';

const Dashboard = ({ city }) => {
  // State to store weather data
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_OPEN_WEATHER_API

  // Fetch weather and AQI data when the component mounts or city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);



        // Fetching AQI data based on the latitude and longitude of the city
        const { lat, lon } = weatherData.coord;
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`
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
    return <div className="flex items-center justify-center mx-auto h-auto relative flex-col md:flex-row w-[90vw] md:w-[70vw]">
      <div className="w-[100%]  mx-auto p-10">
    

        {/* Temperature */}
        <SkeletonLoader height="10vh" width="30%" className="mx-auto mb-4" />

   

        {/* AQI SeekBar */}
        <div className="mt-4">
          <SkeletonLoader height="15vh" width="100%" />
        </div>

        {/* Weather Metrics */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonLoader height="10vh" width="100%" className="mb-2" />
          <SkeletonLoader height="10vh" width="100%" className="mb-2" />
          <SkeletonLoader height="10vh" width="100%" className="mb-2" />
          <SkeletonLoader height="10vh" width="100%" className="mb-2" />
        </div>

        {/* SunArc */}
        <div className="mt-4">
          <SkeletonLoader height="150px" width="100%" />
        </div>
      </div>
    </div>;
  }

  if (error) {
    alert('Please enter a valid city name.');
  }



  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the UNIX epoch

  return (
    <div className="flex items-center justify-center mx-auto h-auto relative flex-col md:flex-row w-[90vw] md:w-[70vw]">




      <div className="w-[100%]">
        <p className="text-center text-textSecondary font-normal text-[1rem] p-1">{weather.name}</p>
        <h3 className="m-2 md:m-4 text-white font-medium text-3xl md:text-3xl mx-auto text-center">{Math.trunc(weather.main.temp)} °C</h3>
        <p className="text-center text-textSecondary font-normal text-[1rem] p-1">{weather.weather[0].description}</p>





        {/* Render SeekBar component with the AQI */}
        {aqi && <SeekBar aqi={aqi} />}

        <WeatherMetrics
          humidity={weather.main.humidity}
          pressure={weather.main.pressure}
          wind={weather.wind.speed}
          uv={weather.wind.speed}
        />


        {/* Render SunArc component with the sunrise, sunset, and current time */}
        {weather.sys.sunrise && weather.sys.sunset && (
          <SunArc
            sunrise={weather.sys.sunrise}
            sunset={weather.sys.sunset}
            currentTime={currentTime}

          />
        )}


      </div>
    </div>
  );
};

export default Dashboard;
