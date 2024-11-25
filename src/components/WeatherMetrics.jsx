import React from 'react';

// Function to convert visibility from meters to kilometers and truncate decimal
const convertVisibilityToKm = (visibilityInMeters) => {
    if (typeof visibilityInMeters !== 'number' || visibilityInMeters < 0) {
        return 'Invalid visibility data';
    }
    return `${Math.trunc(visibilityInMeters / 1000)} km`;
};

const windDirection = (windAngle) => {
    // Ensure angle is in the range 0 to 360 degrees
    windAngle = (windAngle + 360) % 360;

    // Determine the cardinal direction based on the angle
    let direction = '';
    let svgIcon = null;

    if (windAngle >= 0 && windAngle < 45) {
        direction = 'N';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
            </svg>
        );
    } else if (windAngle >= 45 && windAngle < 90) {
        direction = 'NE';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg"  fill="#fff" className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
            </svg>
        );
    } else if (windAngle >= 90 && windAngle < 135) {
        direction = 'E';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="h-[1.125rem] w-[1.125rem]"  viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
            </svg>
        );
    } else if (windAngle >= 135 && windAngle < 180) {
        direction = 'SE';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z" />
            </svg>
        );
    } else if (windAngle >= 180 && windAngle < 225) {
        direction = 'S';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg"  fill="#fff" className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
            </svg>
        );
    } else if (windAngle >= 225 && windAngle < 270) {
        direction = 'SW';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg"  fill="#fff" className="h-[1.125rem] w-[1.125rem]" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z" />
            </svg>
        );
    } else if (windAngle >= 270 && windAngle < 315) {
        direction = 'W';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="h-[1.125rem] w-[1.125rem] font-medium" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H3.707l10.147 10.146a.5.5 0 0 1-.708.708L3 3.707V8.5a.5.5 0 0 1-1 0z" />
            </svg>
        );
    } else if (windAngle >= 315 && windAngle < 360) {
        direction = 'NW';
        svgIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="h-[1.125rem] w-[1.125rem] font-medium" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 1 .5.5h6a.5.5 0 0 1 0-1H3.707L13.146 12.854a.5.5 0 1 1-.708.708L3 3.707V7.5a.5.5 0 0 1-1 0z" />
            </svg>
        );
    }

    return { direction, svgIcon };
};

const WeatherMetrics = ({ humidity, pressure, wind, visibility, windAngle }) => {
    const { direction, svgIcon } = windDirection(windAngle);

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 w-[100%] md:w-3/4">
            {/* Humidity */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex  items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13" />
                    </svg>Humidity
                </p>
                <p className="text-lg text-white font-medium">{humidity}%</p>
            </div>

            {/* Pressure */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
                    </svg>Pressure
                </p>
                <p className="text-lg text-white font-medium">{pressure} mb</p>
            </div>

            {/* Wind Speed */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                    Wind Speed
                </p>
                <p className="text-lg text-white flex justify-start items-center gap-1 font-medium">{svgIcon} {wind} km/h</p>
            </div>

            {/* Visibility */}
            <div className="rounded-2xl bg-secondary p-4 text-textSecondary">
                <p className="text-sm font-normal flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1rem] w-[1rem] md:h-[1rem] md:w-[1rem]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>Visibility
                </p>
                <p className="text-lg text-white font-medium">{convertVisibilityToKm(visibility)}</p>
            </div>
        </div>
    );
};

export default WeatherMetrics;
