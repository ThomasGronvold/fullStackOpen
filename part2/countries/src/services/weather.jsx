import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const getCityCords = (country) => {
  if (country) {
    const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.countryNo}&limit=1&appid=${api_key}`;

    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  }
};

const getCityWeather = (country) => {
  if (country) {
    
    return getCityCords(country).then((cityCords) => {
      const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityCords[0].lat.toFixed(2)}&lon=${cityCords[0].lon.toFixed(2)}&units=metric&appid=${api_key}`;
      return axios.get(baseUrl).then((response) => response.data);
    });
  }
};

export default { getCityWeather };
