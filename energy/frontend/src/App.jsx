// src/App.jsx
import { useState } from "react";

function App() {
  // ---- shared ----
  const [timestamp, setTimestamp] = useState("");
  const [amb, setAmb] = useState("");

  // ---- solar ----
  const [irr, setIrr] = useState("");
  const [mod, setMod] = useState("");
  const [solarPrediction, setSolarPrediction] = useState(null);
  const [solarError, setSolarError] = useState(null);
  const [loadingSolar, setLoadingSolar] = useState(false);

  // ---- wind ----
  const [windSpeed10, setWindSpeed10] = useState("");
  const [windSpeed100, setWindSpeed100] = useState("");
  const [windGust10, setWindGust10] = useState("");
  const [windDir10m, setWindDir10m] = useState("");
  const [windDir100m, setWindDir100m] = useState("");
  const [windPrediction, setWindPrediction] = useState(null);
  const [windError, setWindError] = useState(null);
  const [loadingWind, setLoadingWind] = useState(false);

  // ---- submit solar ----
  const handleSolarSubmit = async (e) => {
    e.preventDefault();
    setSolarError(null);
    setSolarPrediction(null);
    setLoadingSolar(true);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          IRRADIATION: Number(irr),
          AMBIENT_TEMPERATURE: Number(amb),
          MODULE_TEMPERATURE: Number(mod),
          timestamp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSolarError(data.error || "Something went wrong");
      } else {
        setSolarPrediction(data.prediction);
      }
    } catch (err) {
      setSolarError("Cannot connect to backend");
    } finally {
      setLoadingSolar(false);
    }
  };

  // ---- submit wind ----
  const handleWindSubmit = async (e) => {
    e.preventDefault();
    setWindError(null);
    setWindPrediction(null);
    setLoadingWind(true);

    try {
      const res = await fetch("http://localhost:5000/wind/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wind_speed_10: Number(windSpeed10),
          wind_speed_100: Number(windSpeed100),
          wind_gust_10: Number(windGust10),
          wind_dir_10m_deg: Number(windDir10m),
          wind_dir_100m_deg: Number(windDir100m),
          AMBIENT_TEMPERATURE: Number(amb),
          timestamp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setWindError(data.error || "Something went wrong");
      } else {
        setWindPrediction(data.wind_prediction);
      }
    } catch (err) {
      setWindError("Cannot connect to backend");
    } finally {
      setLoadingWind(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Solar & Wind Prediction</h1>

      {/* Shared inputs */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Ambient Temperature:
            <input
              type="number"
              value={amb}
              onChange={(e) => setAmb(e.target.value)}
              required
              step="any"
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Date &amp; Time:
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
            />
          </label>
        </div>
      </div>

      {/* Solar */}
      <section style={{ marginBottom: 40 }}>
        <h2>Solar Prediction</h2>
        <form onSubmit={handleSolarSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Irradiation:
              <input
                type="number"
                value={irr}
                onChange={(e) => setIrr(e.target.value)}
                required
                step="any"
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Module Temperature:
              <input
                type="number"
                value={mod}
                onChange={(e) => setMod(e.target.value)}
                required
                step="any"
              />
            </label>
          </div>

          <button type="submit" disabled={loadingSolar}>
            {loadingSolar ? "Predicting Solar..." : "Predict Solar"}
          </button>
        </form>

        {solarPrediction !== null && (
          <p style={{ marginTop: 20 }}>
            <strong>Solar Prediction:</strong> {solarPrediction}
          </p>
        )}
        {solarError && (
          <p style={{ marginTop: 20, color: "red" }}>
            <strong>Error:</strong> {solarError}
          </p>
        )}
      </section>

      {/* Wind */}
      <section>
        <h2>Wind Prediction</h2>
        <form onSubmit={handleWindSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Wind Speed 10m:
              <input
                type="number"
                value={windSpeed10}
                onChange={(e) => setWindSpeed10(e.target.value)}
                required
                step="any"
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Wind Speed 100m:
              <input
                type="number"
                value={windSpeed100}
                onChange={(e) => setWindSpeed100(e.target.value)}
                required
                step="any"
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Wind Gust 10m:
              <input
                type="number"
                value={windGust10}
                onChange={(e) => setWindGust10(e.target.value)}
                required
                step="any"
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Wind Direction 10m (°):
              <input
                type="number"
                value={windDir10m}
                onChange={(e) => setWindDir10m(e.target.value)}
                required
                step="any"
                min="0"
                max="360"
              />
            </label>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>
              Wind Direction 100m (°):
              <input
                type="number"
                value={windDir100m}
                onChange={(e) => setWindDir100m(e.target.value)}
                required
                step="any"
                min="0"
                max="360"
              />
            </label>
          </div>

          <button type="submit" disabled={loadingWind}>
            {loadingWind ? "Predicting Wind..." : "Predict Wind"}
          </button>
        </form>

        {windPrediction !== null && (
          <p style={{ marginTop: 20 }}>
            <strong>Wind Prediction:</strong> {windPrediction}
          </p>
        )}
        {windError && (
          <p style={{ marginTop: 20, color: "red" }}>
            <strong>Error:</strong> {windError}
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
