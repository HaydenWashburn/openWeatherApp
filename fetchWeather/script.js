// Eventually this will be replaced with a element.value in a Input tag
const apiKey = "011ceaa673e608d33292e3f8d37fa170";

// dom elements
let cityEle = document.getElementById("city") ;
let stateEle = document.getElementById("state");
let countryEle = document.getElementById("country");
let formEle = document.getElementById("form");

// state
const limit = "5"
let lan =""
let lon = ""
let currentWeatherURL = ""

async function getCityWeather(){
    let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityEle.value},${stateEle.value},${countryEle.value}&limit=${limit}&appid=${apiKey}`
    let res = await fetch(geoURL, { mode: "cors" })
    let data = await res.json()
    let dataObj = data[0]
    lat = dataObj.lat
    lon = dataObj.lon
    let city = dataObj.name
    let st8 = dataObj.state
    let country = dataObj.country
    currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    // updates the dom
    let cityEl = document.getElementById("cityName");
    cityEl.textContent = city;
    let stateEl = document.getElementById("stateName");
    stateEl.textContent = st8;
    let countryEl = document.getElementById("countryName");
    countryEl.textContent = country;
    
    let day1Icon = dataObj.weather[0].icon
    // todo: check icon source
    let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`
    let day1IconID = document.getElementById("day1Icon")
    day1IconID.src = iconURL
    
    getCurrentWeather();
}

async function getCurrentWeather(){
    let res = await fetch(currentWeatherURL, { mode: "cors" })
    let data = await res.json()
    console.log(data)
    let dataObj = data;
    // todo: display weather data to screen...
}

formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    getCityWeather();
})
