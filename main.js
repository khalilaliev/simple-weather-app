import "./style.css";

const API = import.meta.env.VITE_API_KEY;
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("search");
const city = document.getElementById("city");
const celsius = document.getElementById("celsius");
const windSpeed = document.getElementById("speed");
const humidityPercentage = document.getElementById("percentage");
const wrapper = document.getElementById("wrapper");

wrapper.style.display = "none";
// const windHumidityBox = document.getElementById("windHumidity");
// const cityDegreeBox = document.getElementById("cityDegree");
// const wind = document.getElementById("wind");
// const humidity = document.getElementById("humidity");
// const humiditySvg = document.getElementById("humiditySvg");
// const windSvg = document.getElementById("windSvg");
// wind.style.display = "none";
// humidity.style.display = "none";
// windSvg.style.display = "none";
// humiditySvg.style.display = "none";
// windHumidityBox.style.display = "none";
// cityDegreeBox.style.display = "none";

const renderInfo = (data) => {
  city.innerHTML = data.name;
  celsius.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}°C`;
  humidityPercentage.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed}km/h`;
};

const getWeather = async () => {
  const inputValue = input.value;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API}`;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      console.error("City not found");
    } else {
      const data = await res.json();
      console.log(data);
      renderInfo(data);
      wrapper.style.display = "block";
      // wrapper.classList.add("translate-y-full");
    }
  } catch (error) {
    console.error(error.message);
  }
};

searchBtn.addEventListener("click", () => {
  getWeather();
  input.value = "";
});
