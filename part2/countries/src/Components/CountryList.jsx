const CountryList = ({ onClick, selectedCountry, filteredCountries, filterInput }) => {
  if (selectedCountry) {
    return <Countries key={selectedCountry.name} country={selectedCountry} />;
  } else if (filterInput.length === 0) {
    return <h3>Type in the field above to find countries</h3>;
  } else if (filteredCountries.length > 10) {
    return <h3>Too many matches, specify another filter</h3>;
  } else if (filteredCountries.length == 1) {
    return filteredCountries.map((country) => <Countries key={country.name} country={country} />);
  } else if (filteredCountries.length !== 0) {
    return filteredCountries.map((country) => <Country key={country.name} country={country} onClick={onClick} />);
  } else {
    return <h3>There are no countries with the current filter.</h3>;
  }
};

const Countries = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <img src={country.flag.png} alt={country.flag.alt} />
    </>
  );
};

const Country = ({ country, onClick }) => {
  return (
    <p>
      {country.name}
      <button onClick={() => onClick(country.name)}>shown</button>
    </p>
  );
};

export default CountryList;
