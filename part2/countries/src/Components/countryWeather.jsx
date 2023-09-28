const Weather = ({ weatherForCountry }) => {
  if (weatherForCountry) {
    const imgURL = `https://openweathermap.org/img/wn/${weatherForCountry.weather[0].icon}@2x.png`;
    return (
      <div>
        <h1>Weather in {weatherForCountry.name}</h1>
        <p>Temperature {weatherForCountry.main.temp}</p>
        <img src={imgURL} alt={weatherForCountry.weather[0].description} />
        <p>speed {weatherForCountry.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
