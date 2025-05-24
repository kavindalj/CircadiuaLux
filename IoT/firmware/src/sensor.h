#pragma once
#include <Arduino.h>

// Structure to hold sensor readings
struct SensorData {
  uint16_t colorTemp;
  uint16_t lux;
  bool isValid; // Flag to indicate if the readings are valid
};

// Function declarations
void setupSensor();
SensorData readSensorValues(); // This function will return all relevant data
void controlSensorLed(bool turnOn); // Function to control the sensor LED