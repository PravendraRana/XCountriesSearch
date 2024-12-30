import React, { useEffect, useState } from 'react';
import './index.css';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://0b9f457a-c7f4-4a28-9f68-2fe10314cedd.mock.pstmn.io/crio');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to fetch countries');
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country">
      <header>
        <input
          type="text"
          placeholder="Search for countries"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      <main className="country-grid">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.code}>
              <img src={country.png} alt={`Flag of ${country.common}`} />
              <p>{country.common}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Countries;