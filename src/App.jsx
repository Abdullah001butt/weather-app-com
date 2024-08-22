import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";

const App = () => {
  const [location, setLocation] = useState("");
  const API_KEY = "0cd51854294b0925e9dfd194d4ce3481";

  const fetchWeatherData = async ({ queryKey }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryKey[1]}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchForecastData = async ({ queryKey }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${queryKey[1]}&units=metric&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["weatherData", location],
    queryFn: fetchWeatherData,
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: forecastData,
    error: forecastError,
    isLoading: forecastIsLoading,
  } = useQuery({
    queryKey: ["forecastData", location],
    queryFn: fetchForecastData,
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLocation(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="text-center p-4">
        <input
          type="text"
          className="py-3 px-6 w-[700px] text-lg rounded-3xl border border-gray-200 text-white placeholder:text-gray-400 focus:outline-none"
          placeholder="Search for cities..."
          required
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDownCapture={searchLocation}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-lg font-bold text-gray-600 ml-4">Loading...</p>
        </div>
      ) : (
        <Weather weatherData={data} />
      )}

      {forecastIsLoading ? (
        <div className="flex justify-center py-20">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-lg font-bold text-gray-600 ml-4">Loading...</p>
        </div>
      ) : (
        forecastData && <Forecast forecastData={forecastData} />
      )}
      {forecastError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 shadow-md">
          <strong className="font-bold">Error!</strong>
          <span>{error.message}</span>
          <svg
            className="w-6 h-6 text-red-700 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Zm0 18C7.26 20 4 15.75 4 12C4 8.25 7.26 4 12 4C16.74 4 20 8.25 20 12C20 15.75 16.74 20 12 20Z" />
          </svg>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 shadow-md">
          <strong className="font-bold">Error!</strong>
          <span>{error.message}</span>
          <svg
            className="w-6 h-6 text-red-700 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Zm0 18C7.26 20 4 15.75 4 12C4 8.25 7.26 4 12 4C16.74 4 20 8.25 20 12C20 15.75 16.74 20 12 20Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default App;
