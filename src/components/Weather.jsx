import React from "react";

const Weather = ({ weatherData }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {weatherData ? (
        <div className="p-6 flex justify-between">
          <div className="w-3/4">
            <h2 className="text-4xl font-bold mb-4 text-black">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex justify-between mb-6">
              <div className="text-2xl text-black">
                <p className="mb-2">
                  Temperature: {weatherData.main.temp.toFixed()}°C
                </p>
                <p className="mb-2">Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="text-2xl text-black">
                <p className="mb-2">
                  Weather: {weatherData.weather[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex justify-center items-center">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="w-24 h-24"
            />
          </div>
          {weatherData.name !== undefined ? (
            <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs">
              <div className="flex-justify-between gap-x-4">
                <p className="text-black">Feels Like : </p>
                <p className="font-bold w-20 text-black">
                  {weatherData.main.feels_like.toFixed()}°C
                </p>
              </div>
              <div className="flex-justify-between gap-x-4">
                <p className="text-black">Humidity :</p>
                <p className="font-bold w-20 text-black">
                  {weatherData.main.humidity.toFixed()}%
                </p>
              </div>
              <div className="flex-justify-between gap-x-8">
                <p className="text-black">Wind Speed :</p>
                <p className="font-bold w-20 text-black">
                  {weatherData.wind && weatherData.wind.speed
                    ? (weatherData.wind.speed * 3.6).toFixed(2) + " km/h"
                    : "Loading..."}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="p-6 text-center text-2xl">
          <p className="text-black">Search for a city to display the weather</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
