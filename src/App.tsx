import "./App.css";
import { useState, useEffect, useCallback } from "react";

// Add proper type for select event
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

// Make the interface more strict with readonly properties
interface FormData {
  readonly country: string;
  readonly state: string;
  readonly city: string;
}

// Add proper return type for fetch responses
interface LocationResponse {
  readonly data: string[];
  readonly error?: string;
}

function App(): JSX.Element {
  // Add more specific error handling type
  type ApiError = {
    message: string;
    status?: number;
  };

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    country: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSelectChange =
    (field: keyof FormData) => (e: SelectChangeEvent) => {
      setFormData((data) => ({ ...data, [field]: e.target.value }));
    };

  const fetchStates = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${formData.country}/states`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const respState: string[] = await response.json();
      setStates(respState);
    } catch (err) {
      const error = err as ApiError;
      console.log(error.message || "An error occurred");
    }
  }, [formData.country]);

  useEffect(() => {
    if (!!formData.country) fetchStates();
    setCities([]);
  }, [formData.country, fetchStates]);

  useEffect(() => {
    if (!!formData.state) fetchCities();
    setFormData((data) => ({ ...data, city: "" }));
  }, [formData.state]);

  const fetchCountries = async (): Promise<void> => {
    try {
      const country = await fetch(
        `https://crio-location-selector.onrender.com/countries`
      );
      const respCountry: string[] = await country.json();
      setCountries(respCountry);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const fetchCities = async (): Promise<void> => {
    try {
      const city = await fetch(
        `https://crio-location-selector.onrender.com/country=${formData.country}/state=${formData.state}/cities`
      );
      const respCity: string[] = await city.json();
      setCities(respCity);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="App-data">
        <select
          value={formData.country}
          onChange={handleSelectChange("country")}
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
        <select value={formData.state} onChange={handleSelectChange("state")}>
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select value={formData.city} onChange={handleSelectChange("city")}>
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
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
