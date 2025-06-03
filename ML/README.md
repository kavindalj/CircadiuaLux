# CircadiaLux – Machine Learning Component

This directory contains all the code, data processing scripts, and models related to the ML component of the CircadiuaLux project.

## Overview

The ML pipeline is responsible for determining optimal lighting conditions based on patient-specific data and sleep patterns. It plays a critical role in enabling adaptive and personalized lighting environments for circadian rhythm improvement.

**Key Features:**
- Predicts optimal lighting parameters based on personal data
- Integrates with Supabase backend
- Supports multiple deployment options

**Deployment Options:**
- 💻 Static test data for local verification and development
- 🌐 Supabase-integrated webhook server for automated updates
- 🚀 Production-ready API via Gunicorn for high performance

---

## 🛠️ Setup and Installation

### Prerequisites

- Python 3.10+ recommended

### Step 1: Set Up Python Environment

Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies 

```bash
pip install -r requirements.txt
```

### Step 3: Download Pre-trained Models

To avoid retraining the model, download the pre-trained version:

📦 **[Download Pre-trained Models (Google Drive)](https://drive.google.com/drive/folders/1KBDXukESFwmE5jcKzYHDk3ySg8CeKmVw?usp=sharing)**

After downloading:
1. Create the `models/` directory if it doesn't exist: `mkdir -p models`
2. Extract and place the model files in the `models/` directory:
   - `model.pkl` - The trained prediction model
   - `scaler.pkl` - The data preprocessing scaler

### Step 4: Set Up Environment Variables

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

## 🔌 Supabase Webhook Configuration

To connect your Supabase database to this ML service:

1. **Deploy this server** locally or to your production environment
   - Make note of the server's URL (e.g., `https://your-server-url.com` or use [ngrok](https://ngrok.com/) if testing locally, e.g., `https://<your-ngrok-id>.ngrok.io`)

2. **Log in to your Supabase dashboard** and navigate to your project

3. **Configure Database Webhook:**
   - Go to **Integrations** → **Database Webhooks**
   - Click **Create a new hook**
   - Select the `patients` table to trigger the ML processing
   - Choose the events (INSERT, UPDATE) to trigger the webhook 
   - Enter your server URL + endpoint path: `https://your-server-url.com/predict`
   - Select **HTTP Method**: POST
   - Under **Headers**, add:
     - Key: `Content-Type`, Value: `application/json`
   - Click **Save**

4. **Test the webhook:**
   - Insert a new record into your `patients` table
   - Check your server logs to verify the webhook was received
   - Confirm the prediction data was processed and stored correctly

> **Note:** For local development, you may need to use a tunneling service like [ngrok](https://ngrok.com/) to expose your local server to the internet.

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

## 📁 Project Structure

```bash
.
├── Data/                  # Training and testing datasets
├── models/                # Pre-trained model files
│   ├── model.pkl          # Trained ML model
│   └── scaler.pkl         # Data preprocessing scaler
├── analize.ipynb          # Data exploration and model training notebook
├── app.py                 # Static test application
├── appResultsSmooth.py    # Results smoothing implementation
├── server.py              # Supabase webhook server implementation
├── .env.example           # Example environment variables
└── requirements.txt       # Python dependencies
```

## 📊 Data Sources and Training Pipeline

### Dataset Details

This model was trained using data from:

> Didikoglu, Altug; Lucas, Robert J; Brown, Timothy M (2023). Data: Associations between light exposure and sleep timing and sleepiness while awake in a sample of UK adults in everyday life. University of Manchester. Dataset. https://doi.org/10.48420/23786238.v1

### Training Pipeline 

The training pipeline implemented in `analize.ipynb`. For detailed information on the training process, refer to [`analize.ipynb`](analize.ipynb).

---
For license and contribution info, see the [main README](../README.md).