from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from scipy.interpolate import interp1d
from scipy.signal import savgol_filter
import joblib

# Load model and scaler
model = joblib.load("models/model_1.0.pkl")
scaler_y = joblib.load("models/scaler_1.0.pkl")

# Chronotype mapping
chronotype_map = {
    "Definitely a morning type": 0,
    "Rather more a morning type than an evening type": 1,
    "Rather more an evening type than a morning type": 2,
    "Definitely an evening type": 3
}

def predict_lighting(age, sex, chronotype, sleepDuration_str, wake_time_str, current_time_str, model, scaler_y):
    sex_encoded = 1 if sex == 'Male' else 0
    chronotype_encoded = chronotype_map.get(chronotype, 1)

    current_dt = datetime.strptime(current_time_str, "%H:%M")
    current_time_sec = current_dt.hour * 3600 + current_dt.minute * 60
    current_time_sin = np.sin(2 * np.pi * current_time_sec / 86400)
    current_time_cos = np.cos(2 * np.pi * current_time_sec / 86400)

    wake_time_dt = datetime.strptime(wake_time_str, "%H:%M")
    wake_time_sec = wake_time_dt.hour * 3600 + wake_time_dt.minute * 60
    wake_time_sin = np.sin(2 * np.pi * wake_time_sec / 86400)
    wake_time_cos = np.cos(2 * np.pi * wake_time_sec / 86400)

    sleepDuration_dt = datetime.strptime(sleepDuration_str, "%H:%M")
    sleepDuration_sec = sleepDuration_dt.hour * 3600 + sleepDuration_dt.minute * 60

    X = pd.DataFrame([{
        'age_numeric': age,
        'sex_encoded': sex_encoded,
        'chronotype_encoded': chronotype_encoded,
        'sleepDuration_sec':  sleepDuration_sec,
        'wakeTime_sin': wake_time_sin,
        'wakeTime_cos': wake_time_cos,
        'time_sin': current_time_sin,
        'time_cos': current_time_cos
    }])

    y_pred_scaled = model.predict(X)
    y_pred = scaler_y.inverse_transform(y_pred_scaled)
    mel_ratio = float(y_pred[0][0])
    photopic_lux = float(np.expm1(y_pred[0][1]))

    melanopic_ratios = np.array([0.399, 0.442, 0.525, 0.631, 0.668, 0.836, 0.976])
    cct_values = np.array([2400, 2700, 3000, 3500, 4000, 5000, 6500])
    mel_ratio_to_cct = interp1d(melanopic_ratios, cct_values, kind='linear', fill_value='extrapolate')
    cct_estimated = float(mel_ratio_to_cct(mel_ratio))

    return {
        'PhotopicLux': round(photopic_lux, 2),
        'mel_ratio': round(mel_ratio, 3),
        'CCT_estimated': round(cct_estimated)
    }

def smooth_predictions(results):
    times = [t for t, _ in results]
    photopic = [res['PhotopicLux'] for _, res in results]
    mel = [res['mel_ratio'] for _, res in results]
    cct = [res['CCT_estimated'] for _, res in results]

    window_size = 7 if len(times) >= 7 else len(times) | 1  # Ensure odd
    poly_order = 2

    photopic_smooth = savgol_filter(photopic, window_size, poly_order)
    mel_smooth = savgol_filter(mel, window_size, poly_order)
    cct_smooth = savgol_filter(cct, window_size, poly_order)

    smoothed_results = []
    for i, time_str in enumerate(times):
        smoothed_results.append({
            'Time': time_str,
            'PhotopicLux': float(round(photopic_smooth[i], 2)),
            'mel_ratio': float(round(mel_smooth[i], 3)),
            'CCT_estimated': int(round(cct_smooth[i]))
        })

    return smoothed_results

# Flask App
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    record = data.get("record", {})

    # Validate required fields
    required_fields = ["age", "gender", "wake_time", "chronotype", "sleep_duration"]
    if not all(field in record for field in required_fields):
        return jsonify({"error": "Missing required patient fields"}), 400

    try:
        # Extract patient info
        age = record["age"]
        sex = record["gender"]
        chronotype = record["chronotype"]
        wake_time = record["wake_time"]
        sleep_duration = record["sleep_duration"]

        # Use current date to simulate daily prediction
        def generate_custom_predictions():
            start_time = datetime.strptime("00:00", "%H:%M")
            time_interval = timedelta(minutes=30)
            results = []
            for i in range(48):
                current_time = (start_time + i * time_interval).strftime("%H:%M")
                prediction = predict_lighting(
                    age=age,
                    sex=sex,
                    chronotype=chronotype,
                    sleepDuration_str=sleep_duration,
                    wake_time_str=wake_time,
                    current_time_str=current_time,
                    model=model,
                    scaler_y=scaler_y
                )
                results.append((current_time, prediction))
            return results

        predictions = generate_custom_predictions()
        smoothed = smooth_predictions(predictions)

        print(smoothed)

        return jsonify({
            "status": "success",
            "patient_id": record.get("id"),
            "smoothed_predictions": smoothed
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
