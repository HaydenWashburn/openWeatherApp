// Eventually this will be replaced with a element.value in a Input tag
const apiKey = "011ceaa673e608d33292e3f8d37fa170";

// dom elements
let cityEle = document.getElementById("city");
let stateEle = document.getElementById("state");
let countryEle = document.getElementById("country");
let formEle = document.getElementById("submit");
let weatherDisplayEle = document.getElementById("weatherStatusDay1");

// state
const limit = "5";
let lan = "";
let lon = "";
let currentWeatherURL = "";

async function getCityWeather(cityEle) {
  let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityEle},${stateEle.value},${countryEle.value}&limit=${limit}&appid=${apiKey}`;
  let res = await fetch(geoURL, { mode: "cors" });
  let data = await res.json();
  let dataObj = data[0];
  lat = dataObj.lat;
  lon = dataObj.lon;
  let city = dataObj.name;
  let st8 = dataObj.state;
  let country = dataObj.country;
  currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  // updates the dom
  let cityEl = document.getElementById("cityName");
  cityEl.textContent = city;
  let stateEl = document.getElementById("stateName");
  stateEl.textContent = st8;
  let countryEl = document.getElementById("countryName");
  countryEl.textContent = country;
  getCurrentWeather();
}

async function getCurrentWeather() {
  let res = await fetch(currentWeatherURL, { mode: "cors" });
  let data = await res.json();
  console.log(data);
  let dataObj = data;
  weatherDisplayEle.textContent = `${Math.round(dataObj.main.temp)} °F`;
  let day1Icon = dataObj.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/wn/${day1Icon}@2x.png`;
  let day1IconID = document.getElementById("day1Icon");
  day1IconID.src = iconURL;
  listedAreas()
}

let savedAreas = [];
function saveArea (){
let area = {
  city: cityEle.value,
  state: stateEle.value,
  country: countryEle.value,
  time:new Date().toLocaleTimeString()
}
savedAreas.push(area)
console.log(savedAreas)
}


formEle.addEventListener("click", (event) => {
  event.preventDefault();
  getCityWeather(cityEle.value);
  let checkbox = document.getElementById("checkbox");
  if (checkbox.checked){
    let check = JSON.stringify({city: cityEle.value, state: stateEle.value, country: countryEle.value})
    let bool = savedAreas.some((area) => {
      JSON.stringify(area) == check
      // console.log( JSON.stringify(area), check)
    })
    console.log(bool)
    if (!bool){
      saveArea(cityEle.value)
    }
  }
});

function listedAreas(){
  let ul = document.getElementById("listedAreas")
  let location = document.getElementsByClassName("location")
  Array.from(location).forEach(cl => cl.remove())
  savedAreas.forEach((area) => {
    let li = document.createElement("li")
    li.classList.add("location")
    li.textContent = `${area.city}, ${area.state}, ${area.time}`
    ul.appendChild(li)
    li.addEventListener("click", () => {getCityWeather(area.city)})
  })
}
