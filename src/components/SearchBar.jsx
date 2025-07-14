import React, { useState } from "react";
import CoinInfo from "./CoinInfo"; // Make sure CoinInfo is imported

const SearchBar = ({ coinsData, onCoinSelect }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      // Filter the coin data (coinsData) based on search value
      const filteredData = Object.keys(coinsData).filter((coinSymbol) => {
        const coin = coinsData[coinSymbol];
        // Check if the coin's FullName or Symbol matches the search value
        return (
          coin &&
          (coin.FullName.toLowerCase().includes(lowerCaseSearchValue) ||
            coin.Symbol.toLowerCase().includes(lowerCaseSearchValue))
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <input
        className="search-bar"
        type="text"
        placeholder="Search for a crypto..."
        onChange={(e) => searchItems(e.target.value)} // Use e.target.value directly
        value={searchInput} // Control the input with state
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          backgroundColor: "#eee",
          color: "#333",
        }}
      />
      {searchInput.length > 0 && (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #666",
            borderRadius: "8px",
            backgroundColor: "#555",
            padding: "10px",
          }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {filteredResults.length > 0 ? (
              filteredResults.map((coinSymbol) => {
                const coinData = coinsData[coinSymbol]; // Use coinsData prop
                if (
                  coinData &&
                  coinData.IsTrading &&
                  coinData.Algorithm !== "N/A" &&
                  coinData.ProofType !== "N/A"
                ) {
                  return (
                    <li
                      key={coinSymbol}
                      onClick={() => {
                        onCoinSelect(coinSymbol);
                        setSearchInput("");
                        setFilteredResults([]);
                      }}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #777",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "#ddd",
                        transition: "background-color 0.2s",
                        textAlign: "left",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#666")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      {coinData.FullName} ({coinData.Symbol})
                    </li>
                  );
                }
                return null;
              })
            ) : (
              <p style={{ color: "#aaa", padding: "10px" }}>
                No matching coins found.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
