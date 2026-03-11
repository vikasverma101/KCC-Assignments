const container = document.getElementById("weatherContainer")
const loader = document.getElementById("loader")

// Cities with coordinates
const cities = [
{name:"Delhi", lat:28.61, lon:77.23},
{name:"London", lat:51.50, lon:-0.12},
{name:"New York", lat:40.71, lon:-74.00}
]

function getWeatherEmoji(code){

if(code === 0) return "☀️"
if(code <= 3) return "⛅"
if(code <= 48) return "🌫️"
if(code <= 67) return "🌧️"
if(code <= 77) return "❄️"
if(code <= 99) return "⛈️"

return "🌍"
}

function getWeatherCondition(code){

if(code === 0) return "Clear Sky"
if(code <= 3) return "Partly Cloudy"
if(code <= 48) return "Fog"
if(code <= 67) return "Rain"
if(code <= 77) return "Snow"
if(code <= 99) return "Thunderstorm"

return "Unknown"
}

async function fetchWeather(){

try{

const requests = cities.map(city =>

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
.then(res => res.json())
)

const results = await Promise.all(requests)

loader.style.display = "none"

results.forEach((data,index)=>{

const city = cities[index]
const temp = data.current_weather.temperature
const code = data.current_weather.weathercode

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<h2>${city.name}</h2>
<div class="emoji">${getWeatherEmoji(code)}</div>
<div class="temp">${temp}°C</div>
<div class="condition">${getWeatherCondition(code)}</div>

`

container.appendChild(card)

})

}catch(error){

loader.style.display="none"
container.innerHTML=`<p class="error">Failed to load weather data</p>`

}

}

fetchWeather()