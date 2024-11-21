import React from "react";

const SunArc = ({ sunrise, sunset, currentTime }) => {
  // Convert times (in seconds) to a normalized 0-1 scale based on the day duration
  const totalDayDuration = sunset - sunrise;
  const elapsedTime = currentTime - sunrise;

  // Calculate sun position (angle along the arc)
  const sunAngle = (elapsedTime / totalDayDuration) * Math.PI; // Angle in radians

  // Arc radius and center
  const radius = 90;
  const centerX = 100;
  const centerY = 90;

  // Sun position (x, y) on the arc
  const sunX = centerX + radius * Math.cos(Math.PI - sunAngle); // Flip angle for SVG direction
  const sunY = centerY - radius * Math.sin(Math.PI - sunAngle); // Adjust for SVG y-axis inversion

  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      {/* Arc path */}
      <path
        d={`M10 90 A90 90 0 0 1 190 90`}
        fill="none"
        stroke="gold"
        strokeWidth="2"
      />

      {/* Sun circle */}
      <circle cx={sunX} cy={sunY} r="5" fill="orange" />
    </svg>
  );
};

export default SunArc;
