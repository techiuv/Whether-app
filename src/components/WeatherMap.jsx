import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// npm install react-leaflet leaflet

const WeatherMap = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={false}>
        {/* TileLayer for OpenStreetMap or another map source */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Add your layers like weather overlays here */}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
