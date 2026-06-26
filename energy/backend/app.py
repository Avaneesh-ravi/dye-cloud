from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import math
import openmeteo_requests
import requests_cache
from retry_requests import retry

app = Flask(__name__)

# Allow frontend on localhost:5173
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

# ------------------------------------------------
#                   SOLAR MODEL
# ------------------------------------------------

with open("solar_trained_model.pkl", "rb") as f:
    solar_model = pickle.load(f)

SOLAR_HISTORY_CSV = "solar_cleaned_dataset.csv"
SOLAR_DATETIME_COL = "DATE_TIME"
SOLAR_ENERGY_COL = "ENERGY_KWH_HOUR"

solar_hist = pd.read_csv(SOLAR_HISTORY_CSV)
solar_hist[SOLAR_DATETIME_COL] = pd.to_datetime(solar_hist[SOLAR_DATETIME_COL])
solar_hist = solar_hist.sort_values(SOLAR_DATETIME_COL).reset_index(drop=True)


def build_solar_features(irr, amb, mod, ts_str):
    ts = pd.to_datetime(ts_str)
    hour = ts.hour
    dayofweek = ts.dayofweek

    hour_sin = math.sin(2 * math.pi * hour / 24.0)
    hour_cos = math.cos(2 * math.pi * hour / 24.0)

    s = solar_hist[SOLAR_ENERGY_COL]

    if len(s) < 24:
        lag1 = lag2 = lag3 = lag24 = s.iloc[-1]
        roll24_mean = roll3_mean = float(s.mean())
    else:
        lag1 = s.iloc[-1]
        lag2 = s.iloc[-2]
        lag3 = s.iloc[-3]
        lag24 = s.iloc[-24]
        roll24_mean = float(s.iloc[-24:].mean())
        roll3_mean = float(s.iloc[-3:].mean())

    return [
        irr,
        amb,
        mod,
        hour_sin,
        hour_cos,
        dayofweek,
        lag1,
        lag2,
        lag3,
        lag24,
        roll24_mean,
        roll3_mean,
    ]


@app.route("/predict", methods=["POST"])
def predict_solar():
    data = request.get_json()

    try:
        irr = float(data["IRRADIATION"])
        amb = float(data["AMBIENT_TEMPERATURE"])
        mod = float(data["MODULE_TEMPERATURE"])
        ts_str = data["timestamp"]
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400
    except ValueError:
        return jsonify({"error": "Numeric solar inputs required"}), 400

    # Business rule: if irradiation is zero, solar production is zero
    if irr == 0.0:
        return jsonify({"prediction": 0.0})

    x = build_solar_features(irr, amb, mod, ts_str)
    X = np.array([x])
    y_pred = solar_model.predict(X)[0]

    return jsonify({"prediction": float(y_pred)})


# ------------ WIND MODEL ------------

with open("wind_trained_model.pkl", "rb") as f:
    wind_model = pickle.load(f)

WIND_HISTORY_CSV = "Location1.csv"      # your wind training/history data
WIND_DATETIME_COL = "Time"
WIND_ENERGY_COL = "Power"

wind_hist = pd.read_csv(WIND_HISTORY_CSV)
wind_hist[WIND_DATETIME_COL] = pd.to_datetime(wind_hist[WIND_DATETIME_COL])
wind_hist = wind_hist.sort_values(WIND_DATETIME_COL).reset_index(drop=True)

# feature order from notebook:
# ['wind_speed', 'wind_speed_sq', 'wind_speed_cu', 'wind_speed_100',
#  'wind_speed_10', 'wind_dir_sin', 'wind_dir_cos', 'wind_gust_10',
#  'hour_sin', 'hour_cos', 'dayofweek', 'lag_energy_1', 'lag_energy_2',
#  'lag_energy_3', 'lag_energy_24', 'roll24_energy_mean',
#  'roll3_energy_mean', 'energy_per_windspeed', 'AMBIENT_TEMPERATURE']

def build_wind_features(
    wind_speed_10,        # from windspeed_10m
    wind_speed_100,       # from windspeed_100m
    wind_gust_10,         # from windgusts_10m
    wind_dir_10m_deg,     # not used directly but kept for future
    wind_dir_100m_deg,    # main direction for sin/cos
    amb_temp,
    ts_str,
):
    ts = pd.to_datetime(ts_str)
    hour = ts.hour
    dayofweek = ts.dayofweek

    # time features
    hour_sin = math.sin(2 * math.pi * hour / 24.0)
    hour_cos = math.cos(2 * math.pi * hour / 24.0)

    # base speed = 10m speed (same as in training)
    wind_speed = wind_speed_10
    wind_speed_sq = wind_speed ** 2
    wind_speed_cu = wind_speed ** 3

    # direction → sin/cos (use 100m as main direction)
    base_dir_deg = wind_dir_100m_deg
    rad = math.radians(base_dir_deg)
    wind_dir_sin = math.sin(rad)
    wind_dir_cos = math.cos(rad)

    # lags & rolling on target Power
    s = wind_hist[WIND_ENERGY_COL]

    if len(s) < 24:
        lag1 = lag2 = lag3 = lag24 = s.iloc[-1]
        roll24_mean = roll3_mean = float(s.mean())
    else:
        lag1 = s.iloc[-1]
        lag2 = s.iloc[-2]
        lag3 = s.iloc[-3]
        lag24 = s.iloc[-24]
        roll24_mean = float(s.iloc[-24:].mean())
        roll3_mean = float(s.iloc[-3:].mean())

    # energy_per_windspeed ~ last power / current base speed
    eps = 1e-6
    energy_last = float(s.iloc[-1])
    energy_per_windspeed = energy_last / max(wind_speed, eps)

    feats = [
        wind_speed,         # wind_speed
        wind_speed_sq,      # wind_speed_sq
        wind_speed_cu,      # wind_speed_cu
        wind_speed_100,     # wind_speed_100
        wind_speed_10,      # wind_speed_10
        wind_dir_sin,       # wind_dir_sin
        wind_dir_cos,       # wind_dir_cos
        wind_gust_10,       # wind_gust_10
        hour_sin,           # hour_sin
        hour_cos,           # hour_cos
        dayofweek,          # dayofweek
        lag1,               # lag_energy_1
        lag2,               # lag_energy_2
        lag3,               # lag_energy_3
        lag24,              # lag_energy_24
        roll24_mean,        # roll24_energy_mean
        roll3_mean,         # roll3_energy_mean
        energy_per_windspeed,
        amb_temp,           # AMBIENT_TEMPERATURE
    ]
    return feats


@app.route("/wind/predict", methods=["POST"])
def predict_wind():
    data = request.get_json()

    try:
        # names here must match what frontend sends
        wind_speed_10   = float(data["wind_speed_10"])      # windspeed_10m
        wind_speed_100  = float(data["wind_speed_100"])     # windspeed_100m
        wind_gust_10    = float(data["wind_gust_10"])       # windgusts_10m
        wind_dir_10m_deg  = float(data["wind_dir_10m_deg"])
        wind_dir_100m_deg = float(data["wind_dir_100m_deg"])
        amb_temp        = float(data["AMBIENT_TEMPERATURE"])
        ts_str          = data["timestamp"]
    except KeyError as e:
        return jsonify({"error": f"Missing wind field: {e}"}), 400
    except ValueError:
        return jsonify({"error": "Numeric wind inputs required"}), 400

    x = build_wind_features(
        wind_speed_10,
        wind_speed_100,
        wind_gust_10,
        wind_dir_10m_deg,
        wind_dir_100m_deg,
        amb_temp,
        ts_str,
    )
    X = np.array([x])
    y_pred = wind_model.predict(X)[0]

    return jsonify({"wind_prediction": float(y_pred)})


@app.route('/solar/history', methods=['GET'])
def solar_history():
    # return last 48 rows of solar history as JSON
    try:
        df = solar_hist.sort_values(SOLAR_DATETIME_COL).reset_index(drop=True)
        recent = df.tail(48)[[SOLAR_DATETIME_COL, SOLAR_ENERGY_COL]]
        records = recent.to_dict(orient='records')
        # convert timestamps to iso strings
        for r in records:
            r[SOLAR_DATETIME_COL] = pd.to_datetime(r[SOLAR_DATETIME_COL]).isoformat()
        return jsonify({"history": records})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/wind/history', methods=['GET'])
def wind_history():
    try:
        df = wind_hist.sort_values(WIND_DATETIME_COL).reset_index(drop=True)
        recent = df.tail(48)[[WIND_DATETIME_COL, WIND_ENERGY_COL]]
        records = recent.to_dict(orient='records')
        for r in records:
            r[WIND_DATETIME_COL] = pd.to_datetime(r[WIND_DATETIME_COL]).isoformat()
        return jsonify({"history": records})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------------------------------------
#              OPEN-METEO WEATHER API
# ------------------------------------------------

@app.route("/weather", methods=["GET"])
def get_weather():
    """
    Fetch live weather data from Open-Meteo API
    Params (optional): latitude, longitude, timezone
    Default location: Jaipur, India (26.9124°N, 75.7873°E)
    Returns: Current weather data with irradiation estimate and wind parameters
    """
    try:
        # Get location from query params (default: Jaipur)
        latitude = float(request.args.get("latitude", 26.9124))
        longitude = float(request.args.get("longitude", 75.7873))
        timezone = request.args.get("timezone", "Asia/Kolkata")
        
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": [
                "temperature_2m",
                "relative_humidity_2m",
                "weather_code",
                "cloud_cover",
                "wind_speed_10m",
                "wind_direction_10m",
                "wind_gusts_10m"
            ],
            "hourly": [
                "temperature_2m",
                "cloud_cover",
                "wind_speed_10m",
                "wind_speed_80m",
                "wind_speed_120m",
                "wind_direction_10m",
                "wind_direction_80m",
                "wind_direction_120m",
                "wind_gusts_10m"
            ],
            "timezone": timezone
        }
        
        responses = openmeteo.weather_api(url, params=params)
        response = responses[0]
        
        current = response.Current()
        hourly = response.Hourly()
        
        # Extract current data
        current_data = {
            "timestamp": pd.to_datetime(current.Time(), unit="s", utc=True).isoformat(),
            "temperature_2m": current.Variables(0).Value(),
            "relative_humidity_2m": current.Variables(1).Value(),
            "weather_code": current.Variables(2).Value(),
            "cloud_cover": current.Variables(3).Value(),
            "wind_speed_10m": current.Variables(4).Value(),
            "wind_direction_10m": current.Variables(5).Value(),
            "wind_gusts_10m": current.Variables(6).Value(),
        }
        
        # Estimate solar irradiation based on cloud cover
        # Formula: clear sky ~1000 W/m², reduced by cloud cover percentage
        cloud_cover = current_data["cloud_cover"]
        estimated_irradiation = max(0.03, 1000 * (1 - cloud_cover / 100.0) / 1000.0)  # Normalized to decimal
        current_data["estimated_irradiation"] = estimated_irradiation
        
        # Extract hourly data (current hour)
        hourly_temp_2m = hourly.Variables(0).ValuesAsNumpy()
        hourly_cloud_cover = hourly.Variables(1).ValuesAsNumpy()
        hourly_wind_speed_10m = hourly.Variables(2).ValuesAsNumpy()
        hourly_wind_speed_80m = hourly.Variables(3).ValuesAsNumpy()
        hourly_wind_speed_120m = hourly.Variables(4).ValuesAsNumpy()
        hourly_wind_dir_10m = hourly.Variables(5).ValuesAsNumpy()
        hourly_wind_dir_80m = hourly.Variables(6).ValuesAsNumpy()
        hourly_wind_dir_120m = hourly.Variables(7).ValuesAsNumpy()
        hourly_wind_gusts_10m = hourly.Variables(8).ValuesAsNumpy()
        
        # Get current hour data (index 0)
        hourly_data = {
            "temperature_80m": float(hourly_temp_2m[0]) if len(hourly_temp_2m) > 0 else current_data["temperature_2m"],
            "wind_speed_80m": float(hourly_wind_speed_80m[0]) if len(hourly_wind_speed_80m) > 0 else current_data["wind_speed_10m"],
            "wind_speed_100m": float(hourly_wind_speed_120m[0]) if len(hourly_wind_speed_120m) > 0 else current_data["wind_speed_10m"],
            "wind_speed_10m": float(hourly_wind_speed_10m[0]) if len(hourly_wind_speed_10m) > 0 else current_data["wind_speed_10m"],
            "wind_direction_80m": float(hourly_wind_dir_80m[0]) if len(hourly_wind_dir_80m) > 0 else current_data["wind_direction_10m"],
            "wind_direction_100m": float(hourly_wind_dir_120m[0]) if len(hourly_wind_dir_120m) > 0 else current_data["wind_direction_10m"],
            "wind_direction_10m": float(hourly_wind_dir_10m[0]) if len(hourly_wind_dir_10m) > 0 else current_data["wind_direction_10m"],
            "wind_gust_10m": float(hourly_wind_gusts_10m[0]) if len(hourly_wind_gusts_10m) > 0 else current_data["wind_gusts_10m"],
        }
        
        return jsonify({
            "current": current_data,
            "hourly": hourly_data,
            "location": {
                "latitude": latitude,
                "longitude": longitude,
                "timezone": timezone
            }
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("Starting Flask server on http://127.0.0.1:5000 ...")
    app.run(port=5000, debug=True)
