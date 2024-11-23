import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';

function App() {
  const [city, setCity] = useState('jamui');

  // Function to fetch city name based on user's geolocation
  const fetchCityFromGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const apiKey = import.meta.env.VITE_OPEN_WEATHER_API;
          const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

          try {
            const response = await fetch(apiUrl);
            if (response.ok) {
              const data = await response.json();
              if (data.length > 0) {
                const detectedCity = data[0].name;
                setCity(detectedCity);
              }
            } else {
              console.error('Error fetching city data:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Geolocation error:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchCityFromGeolocation();
  }, []); // Run this effect once on component mount

  return (
    <>
      <SearchBar setCity={setCity} />
      <Dashboard city={city} />
    </>
  );
}

export default App;
