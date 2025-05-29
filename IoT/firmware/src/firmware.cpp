#include <Arduino.h>
#include <WiFi.h>
#include "config.h"       // For general configurations
#include "getdetails.h"   // Include supabase details header
#include "sensor.h"       // Include sensor header
#include "lightcontrol.h" // Include lightcontrol header
#include "wifimanager.h" // Include WiFi manager header

struct tm timeinfo;

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

  pinMode(RESET_BTN_PIN,INPUT_PULLUP);  // Initialize the Reset Button pin
  pinMode(AP_LED_PIN, OUTPUT); // Initialize the Access Point LED pin

  digitalWrite(AP_LED_PIN, LOW); // Turn off the Access Point LED initially

  // Connecting to Wi-Fi
  WiFiCredentials WiFiCredentials = readWiFiCredentialsFromEEPROM();
  Serial.print("SSID: "); Serial.println(WiFiCredentials.ssid);
  Serial.print("Password: "); Serial.println(WiFiCredentials.password);
  connectToWiFi(WiFiCredentials); // Connect to Wi-Fi with credentials from EEPROM

  // Wait for time to be set
  // connectNTPServers();

  // Beginning Supabase Connection
  // db.begin(supabase_url, anon_key);

  // Print the time
  // Serial.println("Current time:");
  // Serial.println(&timeinfo, "%Y-%m-%d %H:%M:%S");

  setupSensor(); // Initialize the sensor module
  setupCCTPins(); // Initialize the CCT pins

  // String time = "03:30";
  
  // SupabaseData data = getDataFromSupabase(device_id,time);

  // Serial.println(data.sleep_time);
  // Serial.println(data.PhotopicLux);
  // Serial.println(data.CCT_estimated);

}

void loop() {
  // resetCheckAndStartWiFiManager();
  SensorData sensorReadings = readSensorValues();

  if (sensorReadings.isValid) {
    //Call the PID control function with the sensor readings
    // PIDControlLight(
    //   4500, sensorReadings.colorTemp, 
    //   1000, sensorReadings.lux, 
    //   Kp_cct, Ki_cct, Kd_cct, 
    //   Kp_lux, Ki_lux, Kd_lux
    // );
    // simpleCCTControl(4500, sensorReadings.colorTemp);
    simpleControl(4500, sensorReadings.colorTemp);
  } else {
    Serial.println("Failed to read valid sensor data.");
  }
  // applyCCTAndBrightness(0, 55); // Example call to apply CCT and brightness
  // Serial.println(sensorReadings.colorTemp);
}