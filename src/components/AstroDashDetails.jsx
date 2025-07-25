import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const AstroDashDetails = () => {
  const params = useParams();
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${params.postalCode}&country=US&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const details = data.data.find((item) => item.datetime === params.date);
        console.log("Fetched details:", details);

        if (details) {
          setFullData(details);
        } else {
          console.error("No details found for the given date");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [params.date, params.postalCode]);

  return (
    <div className="AstroDashDetails">
      <div className="p-4">
        {fullData ? (
          <div className="bg-white bg-opacity-40 backdrop-blur-md p-28 rounded-2xl max-w-xl text-white shadow-lg">
            <p className="text-lg font-bold mb-2">Date: {fullData.datetime}</p>
            <p className="text-lg mb-2">
              Phase: 🌒 {fullData.moon_phase_lunation || fullData.moon_phase}
            </p>
            <p className="text-lg mb-2">
              Visibility:{" "}
              {fullData.moon_phase
                ? `${(fullData.moon_phase * 100).toFixed(1)}%`
                : "N/A"}
            </p>
            <p className="text-lg mb-2">
              Moonrise:{" "}
              {new Date(fullData.moonrise_ts * 1000).toLocaleTimeString()}
            </p>
            <p className="text-lg mb-2">
              Moonset:{" "}
              {new Date(fullData.moonset_ts * 1000).toLocaleTimeString()}
            </p>
            <p className="text-lg mt-4">
              Description:{" "}
              <span className="font-medium">
                {fullData.weather?.description}
              </span>
            </p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default AstroDashDetails;
