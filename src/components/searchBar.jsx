import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="text-white p-4">
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
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
