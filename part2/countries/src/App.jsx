import { useState, useEffect } from "react";
/* Components */
import Filter from "./Components/Filter";
import CountryList from "./Components/CountryList";
import WeatherComponent from "./Components/countryWeather";

/* Services */
import countries from "./services/countries";
import weather from "./services/weather";

function App() {
  const [countryList, setCountryList] = useState([]);
  const [filterList, setFilteredCountries] = useState([]);

  const [filterInput, setFilterInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weatherForCountry, setWeatherForCountry] = useState("");

  /* Fills the countryList up with the country objects gotten from the API */
  useEffect(() => {
    countries.getAll().then((countryName) => {
      const countryList = [];
      countryName.forEach((country) => {
        const newCountry = {
          name: country.name.common,
          capital: country.capital,
          countryNo: country.cca2,
          area: country.area,
          flag: country.flags,
          languages: country.languages,
        };

        countryList.push(newCountry);
      });
      setCountryList(countryList);
    });
  }, []);

  /* Useeffect on the filterlist, when the filterlist.length is 1 then the weather should show */
  useEffect(() => {
    setWeatherForCountry("");
    if (filterList.length === 1) {
      weather.getCityWeather(filterList[0]).then((weatherData) => {
        setWeatherForCountry(weatherData);
      });
    }
  }, [filterList]);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilteredCountries(countryList.filter((x) => x.name.toLowerCase().includes(filterValue)));
    setFilterInput(filterValue);
    setSelectedCountry("");
  };

  const handleCountryButton = (name) => {
    const selectedCountry = filterList.find((country) => {
      return country.name === name;
    });
    setSelectedCountry(selectedCountry);
    setFilterInput("");

    weather.getCityWeather(selectedCountry).then((weatherData) => {
      setWeatherForCountry(weatherData);
    });
  };

  return (
    <>
      <Filter newFilter={filterInput} handleFilterChange={handleFilterChange} />

      <CountryList onClick={handleCountryButton} selectedCountry={selectedCountry} filteredCountries={filterList} filterInput={filterInput} />

      <WeatherComponent weatherForCountry={weatherForCountry} />
    </>
  );
}

export default App;
