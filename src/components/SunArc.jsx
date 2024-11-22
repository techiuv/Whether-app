import React from "react";

const SunArc = ({ sunrise, sunset, currentTime }) => {
  // Convert times (in seconds) to a normalized 0-1 scale based on the day duration
  const totalDayDuration = sunset - sunrise;
  const elapsedTime = currentTime - sunrise;

  // Calculate the angle for the sun's position
  const angle = (elapsedTime / totalDayDuration) * Math.PI; // Angle in radians (0 to π)

  // Calculate the stroke offset based on elapsed time
  const totalArcLength = 2 * Math.PI * 90; // Arc length (for radius 90)
  const coveredLength = (elapsedTime / totalDayDuration) * totalArcLength; // Length of the covered arc

  // Dynamically change the stroke color based on the time
  const coveredArcColor = elapsedTime < totalDayDuration / 2 ? "#f6d94f" : "#fdeea2"; 

  // Calculate the sun's position
  const sunX = 100 + 90 * Math.cos(Math.PI - angle);
  const sunY = 90 - 90 * Math.sin(Math.PI - angle);

  // Calculate the arc's start and end points for the covered portion
  const startX = 100 + 90 * Math.cos(Math.PI);
  const startY = 90 - 90 * Math.sin(Math.PI);

  const endX = 100 + 90 * Math.cos(Math.PI - angle);
  const endY = 90 - 90 * Math.sin(Math.PI - angle);

  return (
    <div className="flex flex-col items-center mx-auto my-2 p-3 backdrop-blur-md rounded-xl bg-secondary h-auto w-full md:w-3/4">
      <svg width="200" height="100" viewBox="0 0 200 100">
        {/* Horizon line */}
        <line x1="0" y1="90" x2="200" y2="90" stroke="#f6d94f" strokeWidth="1" />

        {/* Arc path (uncovered portion) */}
        <path
          d={`M10 90 A90 90 0 0 1 190 90`} // Full arc path
          fill="none"
          stroke="#f6d94f" // Color for the un-covered part of the arc
          strokeWidth="1"
        />

        {/* Covered arc path with dynamic color */}
        <path
          d={`M10 90 A90 90 0 ${elapsedTime / totalDayDuration > 0.5 ? 1 : 0} 1 ${endX} ${endY}`}
          fill="none"
          stroke={coveredArcColor} // Color for the covered part of the arc
          strokeWidth="2"
          strokeDasharray={totalArcLength} // Total length of the arc
          strokeDashoffset={coveredLength} // Offset the dash to reveal the covered portion
        />

        {/* Sun circle */}
        <circle
          cx={sunX}
          cy={sunY} 
          r="5"
          fill="#fdeea2"
          stroke="#D7FDF2A9"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default SunArc;
