import React, { useState, useEffect } from 'react';
import SeekBar from './Seekbar';
import SunArc from './SunArc';
import WeatherMetrics from './WeatherMetrics';

const Dashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = import.meta.env.VITE_OPEN_WEATHER_API;

  const updateBackground = (sunrise, sunset) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    let gradient = '';

    if (currentTime < sunrise) {
      gradient = 'linear-gradient(315deg, #525c93, #2e3868)'; // Night
    } else if (currentTime >= sunrise && currentTime < sunrise + (sunset - sunrise) / 3) {
      gradient = 'linear-gradient(to bottom, #627294, #9fa7b0, #eeae5f, #c1614e)'; // Morning
    } else if (currentTime >= sunrise + (sunset - sunrise) / 3 && currentTime < sunset - (sunset - sunrise) / 3) {
      gradient = 'linear-gradient(to bottom, #5a99dd, #7bc1f0)';
    } else if (currentTime >= sunset - (sunset - sunrise) / 3 && currentTime < sunset) {
      gradient = 'linear-gradient(to bottom, #385b93, #808cb6)'; // Evening
    } else {
      gradient = 'linear-gradient(315sdeg, #525c93, #2e3868)'; // Night
    }

    document.body.style.background = gradient;
  };

  const getWeatherImage = (sunrise, sunset) => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < sunrise || currentTime >= sunset) {
      return '/moon.png'; // Night (moon)
    } else if (currentTime >= sunrise && currentTime < sunrise + (sunset - sunrise) / 3) {
      return '/sunrise.png'; // Morning
    } else {
      return '/sunrise.png'; // Day
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city || !api) {
        setError('City or API key is missing.');
        setLoading(false);
        return;
      }

      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);


        const { lat, lon } = weatherData.coord;
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`
        );
        if (!aqiResponse.ok) {
          throw new Error('Failed to fetch AQI data');
        }
        const aqiData = await aqiResponse.json();
        setAqi(aqiData.list[0].main.aqi);

        // Update the background based on sunrise and sunset
        if (weatherData.sys.sunrise && weatherData.sys.sunset) {
          updateBackground(weatherData.sys.sunrise, weatherData.sys.sunset);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }


    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto  flex-col w-screen h-screen fixed top-0 left-0">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border"></div>

      </div>
    );
  }

  if (error) {
    alert('city not found');
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center mx-auto h-auto relative flex-col w-[90vw] pt-1   md:w-[70vw]">


      <div className='w-[100%] md:w-3/4 flex row justify-between mx-auto items-center'>
        <div className='text-left w-[60%] p-2'>
          <p className=" text-textSecondary  text-[1rem] py-1  flex justify-start gap-[2px] font-normal items-center">
            {weather.name}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='h-[.7rem] w-[.7rem]' viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>

          </p>
          <h3 className="my-[0px] md:my-[3px] text-white font-medium text-[3.5rem] md:text-[5rem] ">
            {Math.trunc(weather.main.temp)}°
          </h3>
          <p className=" text-white font-medium  text-[.9rem] md:text-lg py-1">
            {weather.weather[0].description}
          </p>
          <p className='text-white text-[1rem] md:text-lg mt-2 py-1 font-medium'>
            {Math.trunc(weather.main.temp_max)}° / {Math.trunc(weather.main.temp_min)}° Feels  like {Math.trunc(weather.main.feels_like)}°
          </p>

        </div>

        <div className='w-[40%]  p-2'>
          <img src={getWeatherImage(weather.sys.sunrise, weather.sys.sunset)} alt="Weather" className='w-[100%] h-[100%] md:w-[300px]' />

        </div>

      </div>



      {aqi && <SeekBar aqi={aqi} />}


      <WeatherMetrics
        humidity={weather.main.humidity}
        pressure={weather.main.pressure}
        wind={weather.wind.speed}
        visibility={weather.visibility}
        windAngle={weather.wind.deg}
      />

      {weather.sys.sunrise && weather.sys.sunset && (
        <SunArc
          sunrise={weather.sys.sunrise}
          sunset={weather.sys.sunset}
          currentTime={Math.floor(Date.now() / 1000)}
        />
      )}
    </div>
  );
};

export default Dashboard;
