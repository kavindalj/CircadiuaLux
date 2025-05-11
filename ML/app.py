import numpy as np
import pandas as pd
from datetime import datetime
from scipy.interpolate import interp1d

from datetime import datetime, timedelta

import joblib

# Load from the models folder
model = joblib.load("models/model_1.0.pkl")
scaler_y = joblib.load("models/scaler_1.0.pkl")

chronotype_map = {
    "Definitely a morning type": 0,
    "Rather more a morning type than an evening type": 1,
    "Rather more an evening type than a morning type": 2,
    "Definitely an evening type": 3
}

def predict_lighting(age, sex, chronotype, sleepDuration_str, wake_time_str, current_time_str, model, scaler_y):
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

    # --- 2. Encode chronotype ---
    chronotype_encoded = chronotype_map.get(chronotype, 1)

    # --- 3. Time of day features ---
    current_dt = datetime.strptime(current_time_str, "%H:%M")
    current_time_sec = current_dt.hour * 3600 + current_dt.minute * 60
    current_time_sin = np.sin(2 * np.pi * current_time_sec / 86400)
    current_time_cos = np.cos(2 * np.pi * current_time_sec / 86400)

    # --- 4. wake time features ---
    wake_time_dt = datetime.strptime(wake_time_str, "%H:%M")
    wake_time_sec = wake_time_dt.hour * 3600 + wake_time_dt.minute * 60
    wake_time_sin = np.sin(2 * np.pi * wake_time_sec / 86400)
    wake_time_cos = np.cos(2 * np.pi * wake_time_sec / 86400)

    # --- 5. sleep duration in sec ---
    sleepDuration_dt = datetime.strptime(sleepDuration_str, "%H:%M")
    sleepDuration_sec = sleepDuration_dt.hour * 3600 + sleepDuration_dt.minute * 60

    # --- 6. Feature vector ---
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

    # --- 7. Predict scaled output ---
    y_pred_scaled = model.predict(X)

    # --- 8. Inverse scale to get true values ---
    y_pred = scaler_y.inverse_transform(y_pred_scaled)
    mel_ratio = float(y_pred[0][0])
    photopic_lux = float(np.expm1(y_pred[0][1]))

    # --- 9. Compute CCT from mel_ratio ---
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
        age=25,
        sex='Male',
        chronotype='Definitely an evening type',
        sleepDuration_str='05:30',
        wake_time_str='07:30',
        current_time_str=current_time,
        model=model,
        scaler_y=scaler_y
    )
    results.append((current_time, output))

# Print results
for time_str, prediction in results:
    print(f"Time: {time_str} -> {prediction}")