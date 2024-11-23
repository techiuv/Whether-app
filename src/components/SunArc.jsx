import React from "react";

const SunArc = ({ sunrise, sunset, currentTime }) => {
  // Convert times (in seconds) to a normalized 0-1 scale based on the day duration
  const totalDayDuration = sunset - sunrise;
  const elapsedTime = currentTime - sunrise;

  // Prevent values out of range (i.e., current time is before sunrise or after sunset)
  const normalizedElapsedTime = Math.max(0, Math.min(elapsedTime, totalDayDuration));

  // Calculate sun position (angle along the arc)
  const sunAngle = (normalizedElapsedTime / totalDayDuration) * Math.PI; // Angle in radians

  // Arc radius and center
  const radius = 90;
  const centerX = 100;
  const centerY = 90;

  // Sun position (x, y) on the arc
  const sunX = centerX + radius * Math.cos(Math.PI - sunAngle); // Flip angle for SVG direction
  const sunY = centerY - radius * Math.sin(Math.PI - sunAngle); // Adjust for SVG y-axis inversion

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
    <div className="flex flex-col items-center mx-auto my-2 p-3 backdrop-blur-md rounded-xl bg-secondary h-auto w-full md:w-3/4">
      <div className="relative w-full h-full flex justify-center items-center flex-col gap-1">
        <div className="w-full h-full relative flex justify-center items-center">
          <svg width="200" height="120" viewBox="0 0 200 100">
            <line x1="0" y1="90" x2="200" y2="90" stroke="#cce6ff" strokeWidth="1" />
            <path
              d={`M10 90 A90 90 0 0 1 190 90`}
              fill="none"
              stroke="#cce6ff"
              strokeWidth="1"
            />

            {/* Sun circle */}
            <circle
              cx={sunX}
              cy={sunY}
              r="10"
              fill="#fdeea2"
              stroke="#D7FDF2A9"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="w-full h-full relative flex justify-between items-start text-textSecondary font-normal  text-sm  md:text-lg px-5">
          <p className="text-center">Sunrise <br /> <span className="text-white font-semibold text-center">{convertTime(sunrise)}</span></p>
          <p className="text-center">Sunset <br /> <span className="text-white font-semibold text-center">{convertTime(sunset)}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SunArc;
