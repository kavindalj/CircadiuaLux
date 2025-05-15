#include <Arduino.h>
#include "config.h"       // For general pin configurations if needed here
#include "sensor.h"       // Include sensor header

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    delay(10); // Wait for serial port to connect on native USB boards
  }
  Serial.println("Firmware Starting...");

  setupSensor(); // Initialize the sensor module
}

void loop() {
  SensorData sensorReadings = readSensorValues();

  if (sensorReadings.isValid) {
    Serial.print("Color Temp: "); Serial.print(sensorReadings.colorTemp); Serial.print(" K, ");
    Serial.print("Lux: "); Serial.print(sensorReadings.lux); Serial.println(", ");
  } else {
    Serial.println("Failed to read valid sensor data.");
  }

  delay(1000);
}