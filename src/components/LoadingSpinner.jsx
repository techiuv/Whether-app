import React from 'react';
import './LoadingSpinner.css'; 

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="lds-roller relative inline-block h-16 w-16">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

