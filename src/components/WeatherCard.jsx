import React from "react";

// Gaya umum untuk kotak info cuaca
const infoBoxStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "1rem 1.5rem",
  borderRadius: "12px",
  minWidth: "130px",
  color: "white",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
};

export default function WeatherCard({ data }) {
  const {
    name,
    weather,
    main: { temp, humidity, feels_like },
    wind: { speed }
  } = data;

  const { icon, main: weatherMain, description } = weather[0];
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="text-center text-white">
      <h1 className="fw-bold display-3">{name}</h1>

      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <img src={iconUrl} alt={description} style={{ width: 60 }} />
        <h4 className="fw-semibold mb-0">{weatherMain}</h4>
      </div>

      <h2 className="display-4 fw-bold mb-4">{temp}°C</h2>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        <InfoBox label="Humidity" value={`${humidity}%`} />
        <InfoBox label="Wind" value={`${speed} km/h`} />
        <InfoBox label="Feels Like" value={`${feels_like}°C`} />
      </div>
    </div>
  );
}

// Komponen kotak info kecil (reusable)
function InfoBox({ label, value }) {
  return (
    <div style={infoBoxStyle}>
      <div className="small fw-semibold">{label}</div>
      <div className="fs-4 fw-bold">{value}</div>
    </div>
  );
}
