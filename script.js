const apiKey = 'de359faa955eafd9c96d96368bdb502f';
let city = 'Jamui';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherData() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayData(data);
    } catch(error) {
        console.log(error);
    }
}

getWeatherData();

let temp = document.getElementById('temp');
let humidity = document.getElementById('humidity');
let realFeel = document.getElementById('real-feel');
let air = document.getElementById('air');
let Status = document.getElementById('status');
let aqi = document.getElementById('aqi');
let Location = document.getElementById('location');
const search = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');

function displayData(data) {
    temp.innerHTML = Math.round(data.main.temp - 272.15) + '°c';
    humidity.innerHTML = data.main.humidity + '%';
    realFeel.innerHTML = Math.round(data.main.feels_like - 272.15) + '°c';
    air.innerHTML = data.wind.speed + 'km/h';
    Status.innerHTML = data.main.pressure + 'mbar';
    aqi.innerHTML = data.weather[0].description;
    Location.innerHTML = city;
    
}

search.addEventListener('click', async () => {
    try{
        if (searchBar.value !== '') {
            city = searchBar.value;
            url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            await getWeatherData();
        }
    } catch(error) {
        alert('Enter a valid city');
    }
});

