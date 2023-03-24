// Eventually this will be replaced with a element.value in a Input tag
const apiKey = "011ceaa673e608d33292e3f8d37fa170";
const cityname = "New+Orleans";
const state = "LA";
const countryCode = "US"
const limit = "5"

const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname},${state},${countryCode}&limit=${limit}&appid=${apiKey}`
async function getCityWeather(){
    let res = await fetch(geoURL)
    let data = await res.json()
    let dataObj = data[0]
    console.log(dataObj)
}

getCityWeather()