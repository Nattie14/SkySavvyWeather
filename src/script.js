function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = capitalizeEveryWord(
    response.data.condition.description
  );
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"
    class="weather-app-icon"/>`;

    getForecast(response.data.city);
}

function capitalizeEveryWord(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];

  return `${day} ${month} ${date.getDate()}, ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

function searchCity(city) {
  let apiKey = "ba4608fb3t14e3e4af50o5a7601d9309";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDay (timestamp){
    let date = new Date (timestamp * 1000);
   let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

   return days[date.getDay()];
}
function getForecast(city){
    let apiKey = "ba4608fb3t14e3e4af50o5a7601d9309";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

axios(apiUrl).then(displayForecast);

    console.log(apiUrl);
}

function displayForecast(response) {
    console.log(response.data);

    let forecast = document.querySelector("#forecast");
  
   
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day,index) {
        if (index <5) {
    forecastHtml =
    forecastHtml +
`  <div>
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div> <img src="${day.condition.icon_url}" class="weather-forecast-icon"/></div>
    <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
  </div>
  </div>
  
  `;
    }
    });
  
    forecastElement.innerHTML = forecastHtml; 
  }
  
  let forecastElement = document.querySelector("#forecast"); 
 
  searchCity("Nyazura");
  




