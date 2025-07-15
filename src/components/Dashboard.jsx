import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState(null);
  const [moonRise, setMoonRise] = useState("");
  const [moonPhaseIcon, setMoonPhaseIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=21113&country=US&lat=35.78&lon=-78.64&key=${API_KEY}`;

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
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        setData(result.data);
        console.log(result.data);

        const minTempDay = result.data.reduce((prev, curr) =>
          curr.temp < prev.temp ? curr : prev
        );

        setCity(result.city_name ? result.city_name : "Unknown");

        if (minTempDay.moonrise_ts) {
          setMoonRise(
            new Date(minTempDay.moonrise_ts * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }
        if (minTempDay.moon_phase) {
          setMoonPhaseIcon(getMoonIcon(minTempDay.moon_phase));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard text-white p-20 bg-black bg-opacity-60">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Location</p>
          <h2 className="text-2xl font-bold">{city ? city : "N/A"}</h2>
        </div>
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Moon Rise</p>
          <h2 className="text-2xl font-bold">{moonRise}</h2>
        </div>
        <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
          <p className="text-lg">Moon Phase</p>
          <h2 className="text-3xl">{moonPhaseIcon}</h2>
        </div>
      </div>
      <SearchBar />

      <div className="bg-white bg-opacity-10 p-4 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">List</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {!loading && !error && (
          <table className="w-full text-sm text-left">
            <thead className="text-white border-b">
              <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Time</th>
                <th>Phase</th>
              </tr>
            </thead>
            <tbody>
              {data.map((day) => (
                <tr key={day.datetime}>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
