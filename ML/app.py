import numpy as np
import pandas as pd
from datetime import datetime
from scipy.interpolate import interp1d

from datetime import datetime, timedelta

import joblib

# Load from the models folder
model = joblib.load("models/lighting_model2.pkl")
scaler_y = joblib.load("models/lscaler_y2.pkl")

def predict_lighting(age, sex, wake_time_str, current_time_str, model, scaler_y):
    """
    Predicts optimal PhotopicLux and CCT_estimated for a patient.
    
    Parameters:
    - age: int, e.g. 29
    - sex: str, 'Male' or 'Female'
    - wake_time_str: str, 'HH:MM', e.g. '07:30'
    - current_time_str: str, 'HH:MM', e.g. '14:45'
    - model: trained regression model
    - scaler_y: fitted MinMaxScaler used on target variables
    
    Returns:
    - dict with predicted PhotopicLux, mel_ratio, and CCT_estimated
    """

    # --- 1. Encode sex ---
    sex_encoded = 1 if sex == 'Male' else 0

    # --- 2. Time of day features ---
    current_dt = datetime.strptime(current_time_str, "%H:%M")
    time_sec = current_dt.hour * 3600 + current_dt.minute * 60
    time_sin = np.sin(2 * np.pi * time_sec / 86400)
    time_cos = np.cos(2 * np.pi * time_sec / 86400)

    # --- 3. Time awake in hours ---
    wake_dt = datetime.strptime(wake_time_str, "%H:%M")
    timeawake = (current_dt - wake_dt).total_seconds() / 3600
    if timeawake < 0:
        timeawake += 24  # handle wrap around midnight

    # --- 4. Feature vector ---
    X = pd.DataFrame([{
    'age_numeric': age,
    'timeawake': timeawake,
    'sex_encoded': sex_encoded,
    'time_sin': time_sin,
    'time_cos': time_cos
    }])

    # --- 5. Predict scaled output ---
    y_pred_scaled = model.predict(X)

    # --- 6. Inverse scale to get true values ---
    y_pred = scaler_y.inverse_transform(y_pred_scaled)
    mel_ratio = float(y_pred[0][0])
    photopic_lux = float(np.expm1(y_pred[0][1]))

    # --- 7. Compute CCT from mel_ratio ---
    melanopic_ratios = np.array([0.399, 0.442, 0.525, 0.631, 0.668, 0.836, 0.976])
    cct_values = np.array([2400, 2700, 3000, 3500, 4000, 5000, 6500])
    mel_ratio_to_cct = interp1d(melanopic_ratios, cct_values, kind='linear', fill_value='extrapolate')
    cct_estimated = float(mel_ratio_to_cct(mel_ratio))

    return {
        'PhotopicLux': round(photopic_lux, 2),
        'mel_ratio': round(mel_ratio, 3),
        'CCT_estimated': round(cct_estimated)
    }

# Starting at midnight
start_time = datetime.strptime("00:00", "%H:%M")
time_interval = timedelta(minutes=30)

# Generate predictions for the whole day in 30-minute steps
results = []

for i in range(48):  # 48 half-hour increments in 24 hours
    current_time = (start_time + i * time_interval).strftime("%H:%M")
    output = predict_lighting(
        age=29,
        sex='Male',
        wake_time_str='07:30',
        current_time_str=current_time,
        model=model,
        scaler_y=scaler_y
    )
    results.append((current_time, output))

# Print results
for time_str, prediction in results:
    print(f"Time: {time_str} -> {prediction}")