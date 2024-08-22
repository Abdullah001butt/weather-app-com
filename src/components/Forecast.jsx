// Forecast.jsx
import React from "react";

const Forecast = ({ forecastData }) => {
  const dailyForecast = {};
  forecastData.list.forEach((day) => {
    const date = new Date(day.dt * 1000).toLocaleDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = [day];
    } else if (dailyForecast[date].length < 2) {
      dailyForecast[date].push(day);
    }
  });

  const sortedDays = Object.keys(dailyForecast).sort((a, b) => {
    const dayA = new Date(a).getDay();
    const dayB = new Date(b).getDay();
    return dayA - dayB;
  });

  return (
    <div className="h-70v overflow-y-auto mb-20 max-w-md mx-auto bg-[#2F3847] rounded-lg shadow-md p-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-white md:text-2xl">
        7-Day Forecast
      </h2>
      <div className="flex flex-wrap justify-center">
        {sortedDays.map((date, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 xl:w-1/2 p-4 md:p-2 xl:p-2"
          >
            {dailyForecast[date].map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex flex-col items-center">
                  <p className="text-lg text-center text-black md:text-base">
                    {getDayName(new Date(day.dt * 1000))}
                  </p>
                  <p className="text-lg text-center text-black md:text-base">
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-lg text-center text-black md:text-base">
                    {new Date(day.dt * 1000).toLocaleTimeString()}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    className="w-20 h-20 mx-auto md:w-16 md:h-16"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: getIconColor(day.weather[0].main),
                    }}
                  />
                </div>
                <p className="text-lg text-center text-black md:text-base">
                  Temperature: {day.main.temp.toFixed()}°C
                </p>
                <p className="text-lg text-center text-black md:text-base">
                  Weather: {day.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const getDayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

const getIconColor = (weather) => {
  switch (weather) {
    case "Clear":
      return "#F7DC6F";
    case "Clouds":
      return "#87CEEB";
    case "Rain":
      return "#4682B4";
    case "Snow":
      return "#ADD8E6";
    case "Thunderstorm":
      return "#4682B4";
    default:
      return "#F7DC6F";
  }
};

export default Forecast;
