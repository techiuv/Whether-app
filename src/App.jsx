import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';

function App() {
  const [city, setCity] = useState('jamui');

  return (
    <>
      <SearchBar setCity={setCity} />
      <Dashboard city={city} />
    </>
  );
}

export default App;
