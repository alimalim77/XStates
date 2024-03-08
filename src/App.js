import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const fetchCountries = async () => {
    const country = await fetch(
      `https://crio-location-selector.onrender.com/countries`
    );
    const respCountry = await country.json();
    setCountries(respCountry);
  };

  const fetchStates = async () => {
    const state = await fetch(
      `https://crio-location-selector.onrender.com/country=${formData.country}/states`
    );
    const respState = await state.json();
    setStates(respState);
  };

  const fetchCities = async () => {
    const city = await fetch(
      `https://crio-location-selector.onrender.com/country=${formData.country}/state=${formData.state}/cities`
    );
    const respCity = await city.json();
    setCities(respCity);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!!formData.country) fetchStates();
    setCities([]);
  }, [formData.country]);

  useEffect(() => {
    if (!!formData.state) fetchCities();
    setFormData((data) => ({ ...data, city: "" }));
  }, [formData.state]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="App-data">
        <select
          value={formData.country}
          onChange={(e) => {
            setFormData((data) => ({ ...data, country: e.target.value }));
          }}
        >
          <option selected>Select a Country</option>
          {countries && countries.map((country) => <option>{country}</option>)}
        </select>
        <select
          value={formData.state}
          onChange={(e) =>
            setFormData((data) => ({ ...data, state: e.target.value }))
          }
        >
          <option selected>Select a State</option>
          {states.length && states.map((state) => <option>{state}</option>)}
        </select>
        <select
          value={formData.city}
          onChange={(e) =>
            setFormData((data) => ({ ...data, city: e.target.value }))
          }
        >
          <option selected>Select a city</option>
          {cities.length && cities.map((city) => <option>{city}</option>)}
        </select>
      </div>
      {!!formData.city && (
        <p>
          You selected {formData.city}, {formData.state}, {formData.country}
        </p>
      )}
    </div>
  );
}

export default App;
