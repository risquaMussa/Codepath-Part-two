import { useState, useEffect } from "react";
import CoinInfo from "./CoinInfo";
import "../App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinList = () => {
  const [allCoinsData, setAllCoinsData] = useState(null); // Stores all coin data from initial fetch
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState(null); // Stores the symbol of the selected coin

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" +
          API_KEY
      );

      const json = await response.json();
      setAllCoinsData(json.Data); // Store only the 'Data' part
    };

    fetchAllCoinData().catch((error) => {
      console.error("Error fetching all coin data:", error);
    });
  }, []);

  const filteredAndSortedCoins = allCoinsData
    ? Object.entries(allCoinsData).filter(
        ([_, coinData]) =>
          coinData.IsTrading &&
          coinData.Algorithm !== "N/A" &&
          coinData.ProofType !== "N/A" &&
          coinData.FullName
      )
    : [];

  return (
    <div>
      {!selectedCoinSymbol && (
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <p style={{ fontSize: "18px", margin: "10px" }}>
            Please select a cryptocurrency from the list below:
          </p>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #555",
              padding: "10px",
              backgroundColor: "#444",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <ul style={{ listStyle: "none", padding: "0" }}>
              {filteredAndSortedCoins.length > 0 ? (
                filteredAndSortedCoins.map(([coinSymbol, coinData]) => (
                  <li
                    key={coinSymbol}
                    onClick={() => setSelectedCoinSymbol(coinSymbol)}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #666",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#bbb",
                      transition: "background-color 0.2s",
                    }}
                  >
                    {coinData.FullName}
                  </li>
                ))
              ) : (
                <p>Loading coin list...</p>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Render CoinInfo only if a coin is selected */}
      {selectedCoinSymbol &&
        allCoinsData &&
        allCoinsData[selectedCoinSymbol] && (
          <div>
            {/* Back button to show the list again */}
            <button
              className="back-button"
              onClick={() => setSelectedCoinSymbol(null)}
            >
              ← back to list
            </button>

            <CoinInfo
              image={
                allCoinsData[selectedCoinSymbol].ImageUrl
                  ? `https://www.cryptocompare.com${allCoinsData[selectedCoinSymbol].ImageUrl}`
                  : null
              }
              name={allCoinsData[selectedCoinSymbol].FullName}
              symbol={allCoinsData[selectedCoinSymbol].Symbol}
            />
          </div>
        )}

      {!allCoinsData && (
        <p style={{ textAlign: "center", color: "#888" }}>
          Failed to load crypto list.
        </p>
      )}
    </div>
  );
};

export default CoinList;
