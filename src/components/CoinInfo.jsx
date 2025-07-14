import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [displayImage, setDisplayImage] = useState(image); // State to control which image source is used

  // Reset displayImage when the 'image' prop changes
  useEffect(() => {
    setDisplayImage(image);
  }, [image]);

  useEffect(() => {
    const getCoinPrice = async () => {
      setLoadingPrice(true);
      setPriceError(false);
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}` +
            `&tsyms=USD&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "Error") {
          throw new Error(data.Message || "Unknown API error for price.");
        }
        setPrice(data);
      } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        setPriceError(true);
        setPrice(null);
      } finally {
        setLoadingPrice(false);
      }
    };

    if (symbol) {
      getCoinPrice();
    } else {
      setPrice(null);
      setLoadingPrice(false);
    }
  }, [symbol]);

  // Log the final image source being used for debugging
  console.log(`CoinInfo for ${name}: Using image source:`, displayImage);

  return (
    <div
      className="
        flex flex-col items-center p-5 bg-gray-700 rounded-lg
        w-full box-border
        md:p-8
        lg:p-10
        lg:w-3/4 "
    >
      {/* Image or Placeholder */}
      {displayImage ? (
        <img
          className="w-16 md:w-32 lg:w-48"
          src={displayImage}
          alt={`Logo for ${name}`}
        />
      ) : null}

      {/* Placeholder for no image or failed load */}
      {!displayImage && <div>NO LOGO</div>}

      {/* Coin Name & Symbol */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            margin: "0",
            color: "#eee",
          }}
        >
          {name}
        </h2>
        <p style={{ fontSize: "30px", color: "#bbb", margin: "5px 0 0 0" }}>
          ({symbol})
        </p>
      </div>

      {/* Price Display */}
      <div style={{ textAlign: "center" }}>
        {loadingPrice ? (
          <p style={{ fontSize: "30px", color: "#ccc" }}>Loading price...</p>
        ) : priceError ? (
          <p style={{ fontSize: "30px", color: "#ff6b6b", fontWeight: "bold" }}>
            Price Error!
          </p>
        ) : price && price.USD !== undefined ? (
          <p
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#4CAF50",
              margin: "0",
            }}
          >
            ${price.USD.toLocaleString()} USD
          </p>
        ) : (
          <p style={{ fontSize: "30px", color: "#ccc" }}>Price N/A</p>
        )}
      </div>
    </div>
  );
};

export default CoinInfo;
