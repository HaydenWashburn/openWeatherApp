// Eventually this will be replaced with a element.value in a Input tag
const apiKey = "011ceaa673e608d33292e3f8d37fa170";
let cityname = document.getElementById("city") ;
let state = document.getElementById("state");
let countryCode = document.getElementById("country");
const limit = "5"
let lan =""
let lon = ""
let currentWeatherURL = ""
async function getCityWeather(){
    let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname.value},${state.value},${countryCode.value}&limit=${limit}&appid=${apiKey}`
    let res = await fetch(geoURL)
    let data = await res.json()
    let dataObj = data[0]
    let city = dataObj.name
    lat = dataObj.lat
    lon = dataObj.lon
    let st8 = dataObj.state
    let country = dataObj.country
    // currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let cityEl = document.getElementById("cityName");
    cityEl.textContent = city;
    let stateEl = document.getElementById("stateName");
    stateEl.textContent = st8;
    let countryEl = document.getElementById("countryName");
    countryEl.textContent = country;
    console.log(dataObj) 
    let day1Icon = dataObj.weather[0].icon
    let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`
    let day1IconID = document.getElementById("day1Icon")
    day1IconID.src = iconURL
}
getCityWeather()

// async function getCurrentWeather(){
//     let res = await fetch(geoURL, { mode: "cors" })
//     let data = await res.json()
//     let dataObj = data
//     console.log(dataObj)
// }

let formSubmit = document.getElementById("form")
formSubmit.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("Test")
    getCityWeather()
})
console.log(formSubmit)