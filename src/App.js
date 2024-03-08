import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries on initial load
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  };

  const fetchStates = () => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((response) => response.json())
      .then((data) => setStates(data));
  };

  const fetchCities = () => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((response) => response.json())
      .then((data) => setCities(data));
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (country) {
      fetchStates();
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    if (state) {
      fetchCities();
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        id="state"
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        id="city"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <p>
        {selectedCity && selectedState && selectedCountry
          ? `You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
          : ""}
      </p>
    </div>
  );
};

export default LocationSelector;

// import logo from "./logo.svg";
// import "./App.css";
// import { useState, useEffect } from "react";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [formData, setFormData] = useState({
//     country: "",
//     state: "",
//     city: "",
//   });

//   const fetchCountries = async () => {
//     const country = await fetch(
//       `https://crio-location-selector.onrender.com/countries`
//     );
//     const respCountry = await country.json();
//     setCountries(respCountry);
//   };

//   const fetchStates = async () => {
//     const state = await fetch(
//       `https://crio-location-selector.onrender.com/country=${formData.country}/states`
//     );
//     const respState = await state.json();
//     setStates(respState);
//   };

//   const fetchCities = async () => {
//     const city = await fetch(
//       `https://crio-location-selector.onrender.com/country=${formData.country}/state=${formData.state}/cities`
//     );
//     const respCity = await city.json();
//     setCities(respCity);
//   };

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     if (!!formData.country) fetchStates();
//     setCities([]);
//   }, [formData.country]);

//   useEffect(() => {
//     if (!!formData.state) fetchCities();
//     setFormData((data) => ({ ...data, city: "" }));
//   }, [formData.state]);

//   return (
//     <div className="App">
//       <h1>Select Location</h1>
//       <div className="App-data">
//         <select
//           value={formData.country}
//           onChange={(e) => {
//             setFormData((data) => ({ ...data, country: e.target.value }));
//           }}
//         >
//           <option selected>Select a Country</option>
//           {countries && countries.map((country) => <option>{country}</option>)}
//         </select>
//         <select
//           value={formData.state}
//           onChange={(e) =>
//             setFormData((data) => ({ ...data, state: e.target.value }))
//           }
//         >
//           <option selected>Select a State</option>
//           {states.length && states.map((state) => <option>{state}</option>)}
//         </select>
//         <select
//           value={formData.city}
//           onChange={(e) =>
//             setFormData((data) => ({ ...data, city: e.target.value }))
//           }
//         >
//           <option selected>Select a city</option>
//           {cities.length && cities.map((city) => <option>{city}</option>)}
//         </select>
//       </div>
//       {!!formData.city && (
//         <p>
//           You selected {formData.city}, {formData.state}, {formData.country}
//         </p>
//       )}
//     </div>
//   );
// }

// export default App;
