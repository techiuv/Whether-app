import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';

function App() {
  const [city, setCity] = useState('jamui');

  // Function to fetch city name based on user's geolocation
  const fetchCityFromGeolocation = async () => {
    const userConsent = window.confirm(
      'This app needs your location to provide weather information for your area. Do you want to allow location access?'
    );

    if (!userConsent) {
      alert('Location permission denied. Showing default city: Jamui.');
      return;
    }

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

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
            } else {
              alert('Could not determine the city from your location.');
            }
          } else {
            console.error('Error fetching city data:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to fetch city data. Please try again later.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Geolocation error: ' + error.message);
      }
    );
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
