import { useEffect, useState } from "react";
import "./WeatherChart.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  BarChart,
  Bar,
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherChart = ({ postalCode = "10001" }) => {
  const [histData, setHistData] = useState(null);
  const [showChart, setShowChart] = useState("true");
  const [chartType, setChartType] = useState("line");

  const API_URL = `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${postalCode}&country=US&key=${API_KEY}`;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(API_URL);
        const text = await response.text();

        console.log("Raw API data:", text);

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = JSON.parse(text);

        if (!result.data || result.data.length === 0) {
          throw new Error("No data found for the given postal code");
        }

        //console.log("Parsed API data:", result.data);
        const cleanedData = result.data.map((day) => ({
          date: day.datetime,
          temp: ((day.temp * 9) / 5 + 32).toFixed(1), // Convert °C to °F
        }));

        setHistData(cleanedData);
      } catch (error) {
        console.error("WeatherChart fetch error:", error);
      }
    };

    getWeatherData();
  }, [postalCode]);

  return (
    <div className="WeatherChart mt-12">
      <h3 className="text-xl font-semibold mb-4">Temperature Forecast</h3>
      <p className="text-sm text-white-600 mb-3">
        This chart displays the 7-day temperature forecast. Toggle between chart
        types or hide the chart using the controls below.
      </p>

      <div className="flex items-center gap-6 mb-6">
        <label>
          <input
            type="checkbox"
            checked={showChart}
            onChange={(e) => setShowChart(e.target.checked)}
          />
          <span className="ml-2">Show Chart</span>
        </label>

        <label className="flex items-center gap-2">
          Chart Type:
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border px-2 py-1 bg-purple-400 rounded text-purple-700"
          >
            <option value="line" className="text-black-600">
              Line
            </option>
            <option value="bar" className="text-black-600">
              Bar
            </option>
          </select>
        </label>
      </div>
      {showChart &&
        histData &&
        (chartType === "line" ? (
          <LineChart
            width={1300}
            height={400}
            data={histData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff69b4"
              activeDot={{ r: 6 }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval={0} angle={-25} dy={10}>
              <Label value="Date" position="insideBottom" dy={30} />
            </XAxis>
            <YAxis
              label={{
                value: "°F",
                angle: -90,
                position: "insideLeft",
                dx: -20,
              }}
            />
            <Tooltip />
          </LineChart>
        ) : (
          <BarChart
            width={1300}
            height={400}
            data={histData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <Bar dataKey="temp" fill="#ff69b4" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval={0} angle={-25} dy={10}>
              <Label value="Date" position="insideBottom" dy={30} />
            </XAxis>
            <YAxis
              label={{
                value: "°F",
                angle: -90,
                position: "insideLeft",
                dx: -20,
              }}
            />
            <Tooltip />
          </BarChart>
        ))}
      {!histData && <p className="text-gray-500">Loading weather data...</p>}
    </div>
  );
};

export default WeatherChart;
