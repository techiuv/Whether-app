import React from 'react';

// Function to map AQI to color
const getAqiColor = (aqi) => {
  if (aqi === 1) return '#00e400'; // Good (0-50)
  if (aqi === 2) return '#ffff00'; // Moderate (51-100)
  if (aqi === 3) return '#ff7e00'; // Unhealthy for sensitive groups (101-150)
  if (aqi === 4) return '#ff0000'; // Unhealthy (151-200)
  if (aqi === 5) return '#8f3f97'; // Very unhealthy (201-300)
  return '#7e0023'; // Hazardous (301-500)
};

const SeekBar = ({ aqi }) => {
  const aqiText = [
    'Good', // 1
    'Moderate', // 2
    'Unhealthy for sensitive groups', // 3
    'Unhealthy', // 4
    'Very Unhealthy', // 5
    'Hazardous' // 6
  ];

  return (
    <div className="flex flex-col items-center mx-auto my-2 p-3 backdrop-blur-md rounded-xl bg-tertiary h-auto w-full md:w-3/4">
      <p className="text-slate-400 text-[1rem] font-normal text-center m-1">AQI</p>
      <p className="text-white text-xl font-normal text-center m-1 mb-2">
        {aqiText[aqi - 1]} {/* Display the AQI text based on value */}
      </p>

      {/* Progress bar container */}
      <div className="relative w-[70%] h-2 mb-1 rounded-xl bg-gray-600">
        {/* Progress bar filling */}
        <div
          className="absolute h-full transition-all duration-200 top-0 left-0 rounded-xl"
          style={{
            backgroundColor: getAqiColor(aqi),
            width: `${(aqi / 5) * 100}%`, // Dynamically adjust width based on AQI
          }}
        />
      </div>
    </div>
  );
};

export default SeekBar;
