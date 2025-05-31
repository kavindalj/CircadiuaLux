# CircadiuaLux – Machine Learning Component

This directory contains all the code, data processing scripts, and models related to the ML component of the CircadiuaLux project.

## Overview

The ML pipeline is responsible for determining optimal lighting conditions based on patient-specific data and sleep patterns. It plays a critical role in enabling adaptive and personalized lighting environments.
This module can run:

- With **static test data** for local verification.
- As a **Supabase-integrated webhook server**.
- As a **production-ready API using Gunicorn**.

---

## 📊 Dataset Source (Citation)

This model was trained using data from:

> Didikoglu, Altug; Lucas, Robert J; Brown, Timothy M (2023). Data: Associations between light exposure and sleep timing and sleepiness while awake in a sample of UK adults in everyday life. University of Manchester. Dataset. https://doi.org/10.48420/23786238.v1

Please cite the authors if you use this data for further research.

## 🧠 Pre-trained Model

To avoid retraining the model, you can download the pre-trained version here:

📦 **[Download Pre-trained Models (Google Drive)](https://drive.google.com/drive/folders/1KBDXukESFwmE5jcKzYHDk3ySg8CeKmVw?usp=sharing)**  
> _Place the downloaded files in the `models/` directory._

🧪 **Want to understand the training pipeline?**  
See [`analize.ipynb`](analize.ipynb) for full data exploration and training steps.

---

## ⚙️ Requirements

- Python 3.10+ recommended

Install the necessary Python packages:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 🔐 Set Up Environment Variables

Before running the model or server, set up your `.env` file. This stores sensitive credentials and file paths needed by the application.

1. **Copy the example file to create your own config:**

```bash
cp .env.example .env
```

2. **Update the values in the `.env` file:**

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-secret-key
MODEL_PATH=models/model.pkl
SCALER_PATH=models/scaler.pkl
```

3. **Ensure the `.env` file is in your project directory.**

## 🚀 How to Run

### 1. Static Test Prediction

Run the model on a hardcoded test input:

```bash
python app.py
```

### 2. Supabase Webhook Server

Run the model as a Supabase webhook server:

```bash
python server.py
```

### 3. Gunicorn Production Server

Run the model as a production-ready API using Gunicorn:

```bash
gunicorn server:app --workers 4
```

> _Note: Gunicorn is a Python WSGI HTTP server that can be used to run the API in production. It can be configured to run multiple processes to handle concurrent requests._ 

## File Structure

```bash
.
├── Data
├── models
│   ├── model.pkl
│   └── scaler.pkl
├── analize.ipynb
├── app.py
├── server.py
├── .env.example
├── requirements.txt
└── README.md
```
---
For license and contribution info, see the [main README](../README.md).
