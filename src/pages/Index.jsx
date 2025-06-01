import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL, API_KEY } from "../constant";
import WeatherCard from "../components/WeatherCard";
import backgroundImage from "../assets/background.jpg";
import { Modal, Button } from "react-bootstrap";

export default function HomePage() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    const infoBoxStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "1rem 1.5rem",
        borderRadius: "12px",
        minWidth: "130px",
        color: "white",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
    };

    const fetchWeather = async (cityName) => {
        if (!cityName.trim()) return;
        setLoading(true);
        try {
            const res = await axios.get(
                `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(res.data);
        } catch (error) {
            setShowErrorModal(true);
            setWeatherData(null);
        } finally {
            setLoading(false);
            setCity("");
            inputRef.current?.focus();
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (city.trim()) {
            debounceRef.current = setTimeout(() => {
                fetchWeather(city);
            }, 2000); 
            // Delay 1 detik setelah berhenti mengetik
        }
    }, [city]);

    return (
        <div
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "2rem",
            }}
        >
            <div style={infoBoxStyle}>
                <h1 className="mb-3 text-center fw-bold color-white">Pendeteksi Cuaca</h1>

                <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Masukkan Nama Kota"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ref={inputRef}
                    disabled={loading}
                />
            </div>

            {weatherData && <WeatherCard data={weatherData} />}

            {/* Modal Error */}
            <Modal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                centered
            >
                <Modal.Header
                    closeButton
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                >
                    <Modal.Title>Kota Tidak Ditemukan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Pastikan nama kota yang kamu masukkan benar.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowErrorModal(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
