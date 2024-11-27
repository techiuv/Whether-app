# Weather App

A feature-rich weather application built using React, Tailwind CSS, and Vite. This app provides real-time weather updates, along with dynamic visuals and themes based on the time of day and sun position.

## Features

- Real-time weather updates for any city.
- Displays sunrise, sunset, and current sun position.
- Changes background theme based on morning, day, evening, and night.
- Dynamic weather icons and animations.
- Responsive design for all devices.
- Search functionality for weather data by city.
- Saves the last fetched city's weather data for quicker access.


## Tech Stack

- **React**: For building the user interface.
- **Tailwind CSS**: For styling and responsive design.
- **Vite**: For faster builds and a better development experience.

## Usage

1. Enter the name of a city in the search bar.
2. View real-time weather data, including temperature, humidity, wind speed, sunrise, sunset, and sun position.
3. Observe dynamic background changes based on the time of day (morning, day, evening, night).
4. Enjoy the clean and responsive interface.

## Previews

<img src="public/previews/Preview(1).jpg" /> 

<img src="public/previews/Preview(2).jpg" /> 
<img src="public/previews/Preview(3).jpg" /> 

<img src="public/previews/Preview(4).jpg" /> 

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/techiuv/weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## Deployment

To deploy the app:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your preferred hosting platform (e.g., Vercel, Netlify, GitHub Pages).

## API Integration

This app uses a weather API to fetch real-time data. Configure your API key in the `.env` file:

```env
VITE_OPEN_WEATHER_API=YOUR_API_KEY
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/) for providing weather data.
- Tailwind CSS for its utility-first styling framework.
