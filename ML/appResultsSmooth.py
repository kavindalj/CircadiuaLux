import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from scipy.interpolate import interp1d
from scipy.signal import savgol_filter
import matplotlib.pyplot as plt
import joblib

# Load model and scaler
model = joblib.load("models/lighting_model3.pkl")
scaler_y = joblib.load("models/lscaler_y3.pkl")

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

def generate_daily_predictions():
    start_time = datetime.strptime("00:00", "%H:%M")
    time_interval = timedelta(minutes=30)
    results = []

    for i in range(48):  # 48 half-hour steps
        current_time = (start_time + i * time_interval).strftime("%H:%M")
        prediction = predict_lighting(
            age=25,
            sex='Male',
            chronotype='Definitely an evening type',
            sleepDuration_str='05:30',
            wake_time_str='07:30',
            current_time_str=current_time,
            model=model,
            scaler_y=scaler_y
        )
        results.append((current_time, prediction))
    
    return results

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
            'PhotopicLux': round(photopic_smooth[i], 2),
            'mel_ratio': round(mel_smooth[i], 3),
            'CCT_estimated': round(cct_smooth[i])
        })

    return smoothed_results

def plot_predictions(original, smoothed):
    times = [entry[0] for entry in original]
    photopic_raw = [entry[1]['PhotopicLux'] for entry in original]
    photopic_smooth = [entry['PhotopicLux'] for entry in smoothed]

    cct_raw = [entry[1]['CCT_estimated'] for entry in original]
    cct_smooth = [entry['CCT_estimated'] for entry in smoothed]

    fig, axs = plt.subplots(2, 1, figsize=(12, 10), sharex=True)

    # Plot PhotopicLux
    axs[0].plot(times, photopic_raw, label="Original PhotopicLux", linestyle="--", alpha=0.4)
    axs[0].plot(times, photopic_smooth, label="Smoothed PhotopicLux", linewidth=2)
    axs[0].set_ylabel("PhotopicLux")
    axs[0].set_title("PhotopicLux Throughout the Day")
    axs[0].legend()
    axs[0].grid(True)

    # Plot CCT
    axs[1].plot(times, cct_raw, label="Original CCT", linestyle="--", alpha=0.4, color='orange')
    axs[1].plot(times, cct_smooth, label="Smoothed CCT", linewidth=2, color='red')
    axs[1].set_ylabel("CCT (K)")
    axs[1].set_title("CCT Estimated Throughout the Day")
    axs[1].set_xlabel("Time")
    axs[1].legend()
    axs[1].grid(True)

    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    raw_results = generate_daily_predictions()
    smoothed_results = smooth_predictions(raw_results)

    # Print smoothed results
    for res in smoothed_results:
        print(res)

    # Plot
    plot_predictions(raw_results, smoothed_results)
