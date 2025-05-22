#include <Arduino.h>
#include "sensor.h"
#include "config.h" // Include configuration file for SENSOR_LED_PIN
#include <Wire.h>   // Wire library for I2C communication
#include "Adafruit_TCS34725.h" //Sensor library

Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_614MS, TCS34725_GAIN_1X);

void setupSensor() {
  pinMode(SENSOR_LED_PIN, OUTPUT);
  digitalWrite(SENSOR_LED_PIN, LOW); // Default: sensor LED OFF

  if (tcs.begin()) {
    Serial.println("TCS34725 Sensor Found");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
  }
}

void controlSensorLed(bool turnOn) {
  if (turnOn) {
    digitalWrite(SENSOR_LED_PIN, HIGH);
  } else {
    digitalWrite(SENSOR_LED_PIN, LOW);
  }
}

SensorData readSensorValues() {
  SensorData data;
  data.isValid = false; // Assume invalid until successfully read

  uint16_t r, g, b, c, colorTemp, lux;

  tcs.getRawData(&r, &g, &b, &c);

  // Calculate color temperature and lux
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);

  data.colorTemp = colorTemp;
  data.lux = lux;

  data.isValid = true; // Mark data as valid
  return data;
}