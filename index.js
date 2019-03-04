const getWeatherButton = document.querySelector(".get-weather-button");
const inputLocationText = document.querySelector(".input-location-text");
const showWeatherResult = document.getElementById("show-weather-result");

const BASEURL = "https://api.apixu.com/v1";
const KEY = "0059b84ab2ae4899afa52938190303";

getWeatherButton.addEventListener("click", func => {
  if (inputLocationText.value != "") {
    requestWeatherInfo();
  }
});

inputLocationText.addEventListener("keyup", func => {
  if (func.keyCode === 13) {
    if (inputLocationText.value != "") {
      requestWeatherInfo();
    }
  }
});

function requestWeatherInfo() {
  const LOCATION = inputLocationText.value;
  fetch(`${BASEURL}/forecast.json?key=${KEY}&q=${LOCATION}&days=${5}`)
    .then(response => {
      if (!response.ok) {
        errorMsg("Please enter correct location");
      }
      return response.json();
    })
    .then(forcast => showWeatherForcast(forcast))
    .catch(err => {
      console.log(err,"catch error");
    });
}

function errorMsg(err) {
  let tagP = document.createElement("P");
  tagP.className = "error";
  let textNode = document.createTextNode(err);
  showWeatherResult.appendChild(tagP);
  tagP.appendChild(textNode);
}

function showWeatherForcast(forcast) {
  let location = `Location :  ${forcast.location.name}, ${
    forcast.location.country
  }`;
  let locationTime = `Time :  ${forcast.location.localtime}`;
  let condition = `Condition :  ${forcast.current.condition.text}`;
  let temperature = `Temperature :  ${forcast.current.temp_c} \u00B0C`;
  let humidity = `Humidity :  ${forcast.current.humidity}%`;
  let windkph = `Wind :  ${forcast.current.wind_kph} km/h`;

  setWeatherInfo(location, "weather-data");
  setWeatherInfo(locationTime, "weather-data");
  setWeatherInfo(condition, "weather-data");
  setWeatherInfo(temperature, "weather-data");
  setWeatherInfo(humidity, "weather-data");
  setWeatherInfo(windkph, "weather-data");

  function setWeatherInfo(weatherValue, className) {
    let tagP = document.createElement("P");
    tagP.className = className;
    let textNode = document.createTextNode(weatherValue);
    showWeatherResult.appendChild(tagP);
    tagP.appendChild(textNode);
  }

  console.log(forcast);
}
