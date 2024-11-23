import React from 'react';

// Function to convert visibility from meters to kilometers and truncate decimal
const convertVisibilityToKm = (visibilityInMeters) => {
    if (typeof visibilityInMeters !== 'number' || visibilityInMeters < 0) {
        return 'Invalid visibility data';
    }
    return `${Math.trunc(visibilityInMeters / 1000)} km`;
};

const WeatherMetrics = ({ humidity, pressure, wind, uv, visibility, real_feel }) => {
    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* Humidity */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-[1rem] font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>Humidity
                </p>
                <p className="text-lg text-white font-medium">{humidity}%</p>
            </div>

            {/* Pressure */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-[1rem] font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>Pressure
                </p>
                <p className="text-lg text-white font-medium">{pressure} hPa</p>
            </div>

            {/* Wind Speed */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>Wind Speed
                </p>
                <p className="text-lg text-white font-medium">{wind} km/h</p>
            </div>

            {/* UV Index */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>UV Index
                </p>
                <p className="text-lg text-white font-medium">{uv}</p>
            </div>

            {/* Real feel */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>Real Feel
                </p>
                <p className="text-lg text-white font-medium">{real_feel}°C</p>
            </div>

            {/* Visibility */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>Visibility
                </p>
                <p className="text-lg text-white font-medium">{convertVisibilityToKm(visibility)}</p>
            </div>
        </div>
    );
};

export default WeatherMetrics;
