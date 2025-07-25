import { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import WeatherChart from "./WeatherChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Dashboard = ({ date, fullData, symbol }) => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState(null);
  const [moonRise, setMoonRise] = useState("");
  const [moonPhaseIcon, setMoonPhaseIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const API_URL = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${postalCode}&country=US&key=${API_KEY}`;

  const toFahrenheit = (c) => ((c * 9) / 5 + 32).toFixed(1);

  const getMoonIcon = (phase) => {
    if (phase < 0.03 || phase > 0.97) return "🌑";
    if (phase < 0.22) return "🌒";
    if (phase < 0.28) return "🌓";
    if (phase < 0.47) return "🌔";
    if (phase < 0.53) return "🌕";
    if (phase < 0.72) return "🌖";
    if (phase < 0.78) return "🌗";
    if (phase < 0.97) return "🌘";
    return "🌑";
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Raw response text:", text);

        if (!text) {
          throw new Error("Empty response from Weatherbit API");
        }

        let result;
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          throw new Error("Invalid JSON format from API");
        }

        if (!result.data || result.data.length === 0) {
          throw new Error("No data found for the given postal code");
        }

        setData(result.data);
        console.log("Parsed data:", result.data);

        const minTempDay = result.data.reduce((prev, curr) =>
          curr.temp < prev.temp ? curr : prev
        );

        setCity(result.city_name || "Unknown");

        if (minTempDay.moonrise_ts) {
          setMoonRise(
            new Date(minTempDay.moonrise_ts * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }

        if (minTempDay.moon_phase !== undefined) {
          setMoonPhaseIcon(getMoonIcon(minTempDay.moon_phase));
        }

        setError(null); // clear previous errors
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postalCode) {
      fetchData();
    }
  }, [postalCode, symbol, API_URL]);

  return (
    <div className="dashboard text-white p-20 bg-black bg-opacity-60">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Location</p>
          <h2 className="text-2xl font-bold">{city ? city : "New York"}</h2>
        </div>
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Moon Rise</p>
          <h2 className="text-2xl font-bold">
            {moonRise ? moonRise : "04:08 PM"}
          </h2>
        </div>
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Moon Phase</p>
          <h2 className="text-3xl">{moonPhaseIcon ? moonPhaseIcon : "🌑"}</h2>
        </div>
      </div>
      <SearchBar onSearch={setPostalCode} />

      {/* <div className="bg-pink bg-opacity-10 p-4 rounded-xl"> */}
      <h3 className="text-xl font-semibold mb-2">List</h3>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && (
        <table className="w-full text-sm text-left">
          <thead className="text-white border-b">
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Time</th>
              <th>Phase</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((day) => (
              <tr key={day.datetime}>
                <>
                  <td>{day.datetime}</td>
                  <td>{toFahrenheit(day.temp)} °F</td>
                  <td>
                    {day.moonrise_ts
                      ? new Date(day.moonrise_ts * 1000).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td>{getMoonIcon(day.moon_phase)}</td>
                  <td className="text-center">
                    <Link
                      to={`/Details/${postalCode}/${day.datetime}`}
                      title="View Details"
                      className="text-white hover:opacity-80"
                    >
                      <FaLink className="inline-block" />
                    </Link>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <WeatherChart postalCode={postalCode} />
    </div>
    // </div>
  );
};

export default Dashboard;
