import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';

// Utility function to get a cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Utility function to set a cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

function App() {
  const [city, setCity] = useState('jamui');
  const [locationPermission, setLocationPermission] = useState(false);

  // Function to fetch city name based on user's geolocation
  const fetchCityFromGeolocation = async () => {
    if (locationPermission) {
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
    } else {
      alert('Location permission denied. Showing default city: Jamui.');
    }
  };

  useEffect(() => {
    const permission = getCookie('locationPermission');
    if (permission === 'granted') {
      setLocationPermission(true);
      fetchCityFromGeolocation();
    } else {
      const userConsent = window.confirm(
        'This app needs your location to provide weather information for your area. Do you want to allow location access?'
      );

      if (userConsent) {
        setLocationPermission(true);
        setCookie('locationPermission', 'granted', 365); // Store the permission in a cookie for 1 year
        fetchCityFromGeolocation();
      } else {
        alert('Location permission denied. Showing default city: Jamui.');
      }
    }
  }, []); // Run this effect once on component mount

  return (
    <>
      <SearchBar setCity={setCity} />
      <Dashboard city={city} />
    </>
  );
}

export default App;
