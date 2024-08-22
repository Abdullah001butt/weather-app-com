import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { IconButton } from "@mui/material";

const Weather = ({ weatherData }) => {
  const getWeatherIcon = () => {
    switch (weatherData.weather[0].main) {
      case "Clear":
        return <WbSunnyIcon sx={{ fontSize: 40, color: "#F7DC6F" }} />;
      case "Clouds":
        return <WbCloudyIcon sx={{ fontSize: 40, color: "#87CEEB" }} />;
      case "Rain":
        return <ThunderstormIcon sx={{ fontSize: 40, color: "#4682B4" }} />;
      case "Snow":
        return <AcUnitIcon sx={{ fontSize: 40, color: "#ADD8E6" }} />;
      case "Thunderstorm":
        return <ThunderstormIcon sx={{ fontSize: 40, color: "#4682B4" }} />;
      default:
        return <WbSunnyIcon sx={{ fontSize: 40, color: "#F7DC6F" }} />;
    }
  };

  const getCurrentTime = () => {
    if (!weatherData) return null;

    const timezoneOffset = weatherData.timezone;
    const currentTimeUnix = weatherData.dt;
    const currentTime = new Date((currentTimeUnix + timezoneOffset) * 1000);

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#2F3847] rounded-lg shadow-md overflow-hidden sm:max-w-full sm:mx-4 my-4">
      {weatherData ? (
        <div className="p-6 flex flex-col sm:flex-row justify-between">
          <div className="w-full sm:w-3/4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-[#FFFFFF]">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex flex-col sm:flex-row justify-between mb-6">
              <div className="text-lg sm:text-2xl text-[#FFFFFF]">
                <p className="mb-2">
                  Temperature: {weatherData.main.temp.toFixed()}°C
                </p>
                <p className="mb-2">Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="text-lg sm:text-2xl text-[#FFFFFF]">
                <p className="mb-2">
                  Weather: {weatherData.weather[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/4 flex justify-center items-center">
            <IconButton
              aria-label="weather-icon"
              sx={{ padding: 2, backgroundColor: "#333", borderRadius: "50%" }}
            >
              {getWeatherIcon()}
            </IconButton>
          </div>
          {weatherData.name !== undefined ? (
            <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs sm:text-base text-[#FFFFFF]">
              <div className="flex justify-between gap-x-4">
                <p className="text-[#FFFFFF]">Feels Like :</p>
                <p className="font-bold w-20 text-[#FFFFFF]">
                  {weatherData.main.feels_like.toFixed()}°C
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-[#FFFFFF]">Humidity :</p>
                <p className="font-bold w-20 text-[#FFFFFF]">
                  {weatherData.main.humidity.toFixed()}%
                </p>
              </div>
              <div className="flex justify-between gap-x-8">
                <p className="text-[#FFFFFF]">Wind Speed :</p>
                <p className="font-bold w-20 text-[#FFFFFF]">
                  {weatherData.wind && weatherData.wind.speed
                    ? (weatherData.wind.speed * 3.6).toFixed(2) + " km/h"
                    : "Loading..."}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-[#FFFFFF]">Current Time :</p>
                <p className="font-bold w-20 text-[#FFFFFF]">
                  {getCurrentTime()}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="p-6 text-center text-lg sm:text-2xl text-[#FFFFFF]">
          <p className="text-[#FFFFFF]">
            Search for a city to display the weather
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
