import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async (searchQuery) => {
    if (!searchQuery) return;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${searchQuery}&country=US&key=${API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.data) {
      setData(result.data);
    } else {
      setData([]);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await fetchData(query);
  };
  const toFahrenheit = (c) => ((c * 9) / 5 + 32).toFixed(1);

  return (
    <div className="text-white p-4">
      <form className="flex gap-2 mb-4" onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Enter postal code"
          className="p-2 rounded text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Search
        </button>
      </form>

      {data.length > 0 && (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp (°F)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((day) => (
              <tr key={day.datetime}>
                <td>{day.datetime}</td>
                <td>{toFahrenheit(day.temp)} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchBar;
