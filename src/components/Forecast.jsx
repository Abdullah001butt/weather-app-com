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
    <div
      style={{
        height: "70vh",
        overflowY: "auto",
        marginBottom: "20px",
        // add a max-width for smaller screens
        maxWidth: "90vw",
        margin: "20px auto",
      }}
      className="bg-white rounded-lg shadow-md p-4 max-w-md mt-8 mx-auto"
    >
      <h2
        className="text-3xl font-bold mb-4 text-black text-center"
        style={{
          // reduce font size for smaller screens
          fontSize: "20px",
        }}
      >
        7-Day Forecast
      </h2>
      <div className="flex flex-wrap justify-center">
        {sortedDays.map((date, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 xl:w-1/2 p-4"
            style={{
              // adjust padding and margin for smaller screens
              padding: "10px",
              margin: "10px auto",
            }}
          >
            {dailyForecast[date].map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
                style={{
                  // adjust padding and margin for smaller screens
                  padding: "10px",
                  margin: "10px auto",
                }}
              >
                <div className="flex flex-col items-center">
                  <p
                    className="text-lg text-black text-center"
                    style={{
                      // reduce font size for smaller screens
                      fontSize: "16px",
                    }}
                  >
                    {getDayName(new Date(day.dt * 1000))}
                  </p>
                  <p
                    className="text-lg text-black text-center"
                    style={{
                      // reduce font size for smaller screens
                      fontSize: "16px",
                    }}
                  >
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </p>
                  <p
                    className="text-lg text-black text-center"
                    style={{
                      // reduce font size for smaller screens
                      fontSize: "16px",
                    }}
                  >
                    {new Date(day.dt * 1000).toLocaleTimeString()}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    className="w-12 h-12 mx-auto"
                    style={{
                      // adjust image size for smaller screens
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </div>
                <p
                  className="text-lg text-black text-center"
                  style={{
                    // reduce font size for smaller screens
                    fontSize: "16px",
                  }}
                >
                  Temperature: {day.main.temp.toFixed()}°C
                </p>
                <p
                  className="text-lg text-black text-center"
                  style={{
                    // reduce font size for smaller screens
                    fontSize: "16px",
                  }}
                >
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

export default Forecast;
