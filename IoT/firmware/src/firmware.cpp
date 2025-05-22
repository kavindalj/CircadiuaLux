#include <Arduino.h>
#include <WiFi.h>
#include "config.h"       // For general configurations
#include "getdetails.h"   // Include supabase details header
#include "sensor.h"       // Include sensor header
#include "lightcontrol.h" // Include lightcontrol header

struct tm timeinfo;

void connectToWiFi() {
  WiFi.begin(ssid, psswd);
  Serial.println("Waiting for WiFi connection...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("WiFi connected");
}

void connectNTPServers() {
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  Serial.println("Waiting for NTP server connection...");
  while (true) {
    if (getLocalTime(&timeinfo)) {
      Serial.println("...NTP server connected.");
      Serial.println("Time acquired:");
      Serial.println(&timeinfo, "%Y-%m-%d %H:%M:%S");
      break;
    } else {
      Serial.println("Failed to connect NTP server. Retrying...");
      delay(2000);
    }
  }
}

void setup(){
  Serial.begin(115200);
  while (!Serial) {
    delay(10); // Wait for serial port to connect on native USB boards
  }
  Serial.println("Firmware Starting...");

  // Connecting to Wi-Fi
  connectToWiFi();

  // Wait for time to be set
  connectNTPServers();

  // Beginning Supabase Connection
  db.begin(supabase_url, anon_key);

  // Print the time
  Serial.println("Current time:");
  Serial.println(&timeinfo, "%Y-%m-%d %H:%M:%S");

  // setupSensor(); // Initialize the sensor module
  // setupCCTPins(); // Initialize the CCT pins

  String time = "01:30";
  
  SupabaseData data = getDataFromSupabase(device_id,time);

  Serial.println(data.sleep_time);
  Serial.println(data.PhotopicLux);
  Serial.println(data.CCT_estimated);
}

void loop() {
  // SensorData sensorReadings = readSensorValues();

  // if (sensorReadings.isValid) {
  //   Serial.print(">ColorTemp:"); Serial.println(sensorReadings.colorTemp);
  //   Serial.print(">Lux:"); Serial.println(sensorReadings.lux);
  // } else {
  //   Serial.println("Failed to read valid sensor data.");
  // }

}