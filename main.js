import "./style.css";

const API = import.meta.env.VITE_API_KEY;
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("search");
const city = document.getElementById("city");
const celsius = document.getElementById("celsius");
const windSpeed = document.getElementById("speed");
const humidityPercentage = document.getElementById("percentage");
const wrapper = document.getElementById("wrapper");
const card = document.getElementById("card");
const country = document.getElementById("country");
const pressure = document.getElementById("pressure");

wrapper.style.display = "none";

const renderInfo = (data) => {
  city.innerHTML = data.name;
  celsius.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}°C`;
  humidityPercentage.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed}km/h`;
  country.innerHTML = `Country: ${data.sys.country}`;
  pressure.innerHTML = `${data.main.pressure}hPa`;
};

const getWeather = async () => {
  const inputValue = input.value;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API}`;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      card.classList.add("card-border");
      wrapper.style.display = "none";
    } else {
      const data = await res.json();
      console.log(data);
      renderInfo(data);
      wrapper.style.display = "block";
      card.classList.remove("card-border");
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
