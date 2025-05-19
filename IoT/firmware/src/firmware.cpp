#include <Arduino.h>
#include <WiFi.h>
#include "config.h"       // For general pin configurations if needed here
#include "getdetails.h"
#include "sensor.h"       // Include sensor header
#include "lightcontrol.h" // Include lightcontrol header

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    delay(10); // Wait for serial port to connect on native USB boards
  }
  Serial.println("Firmware Starting...");

  // Connecting to Wi-Fi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, psswd);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  Serial.println("\nConnected!");

  // Beginning Supabase Connection
  db.begin(supabase_url, anon_key);

  // setupSensor(); // Initialize the sensor module
  // setupCCTPins(); // Initialize the CCT pins
  
  Serial.print(getDataFromSupabase());
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