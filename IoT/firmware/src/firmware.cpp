#include <Arduino.h>
#include <WiFi.h>
#include "config.h"       // For general configurations
#include "getdetails.h"   // Include supabase details header
#include "sensor.h"       // Include sensor header
#include "lightcontrol.h" // Include lightcontrol header
#include "wifimanager.h" // Include WiFi manager header

struct tm timeinfo;

// Add these globals at the top of your file
unsigned long lastTimeCheck = 0;
const unsigned long TIME_CHECK_INTERVAL = 60000; // Check time every 60 seconds
int lastHour = -1;
int lastMinute = -1;
bool halfHourDataFetched = false;
bool hourDataFetched = false;
int targetCCT = 4500;    // Default values
float targetLux = 100;  // Default values

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

void fetchAndApplySettings(const char* timeStr) {
  Serial.printf("Fetching settings for time: %s\n", timeStr);
  
  // Convert const char* to String for getDataFromSupabase
  String timeString = String(timeStr);
  
  // Get settings from Supabase
  SupabaseData data = getDataFromSupabase(device_id, timeString);
  
  // Update global targets
  targetCCT = data.CCT_estimated;
  targetLux = data.PhotopicLux;
  
  Serial.printf("New settings applied - CCT: %d, Lux: %.1f\n", 
                targetCCT, targetLux);
}

void updateLightingBasedOnTime() {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  
  int currentHour = timeinfo.tm_hour;
  int currentMinute = timeinfo.tm_min;
  
  // Check if we need to fetch data (only at XX:00 or XX:30)
  bool needFetchHourData = false;
  bool needFetchHalfHourData = false;
  
  // Check for hour change
  if (currentHour != lastHour) {
    hourDataFetched = false;  // Reset flag on hour change
    halfHourDataFetched = false;
  }
  
  // At the start of each hour (0-5 minutes past, to allow for slight NTP delays)
  if (currentMinute < 5 && !hourDataFetched) {
    needFetchHourData = true;
    hourDataFetched = true;  // Mark as fetched
    Serial.printf("Time to fetch data for hour %d:00\n", currentHour);
  }
  
  // At the 30 minute mark (30-35 minutes, to allow for slight delays)
  if (currentMinute >= 30 && currentMinute < 35 && !halfHourDataFetched) {
    needFetchHalfHourData = true;
    halfHourDataFetched = true;  // Mark as fetched
    Serial.printf("Time to fetch data for hour %d:30\n", currentHour);
  }
  
  // Fetch data if needed
  if (needFetchHourData) {
    // Format time as HH:00
    char timeStr[6];
    sprintf(timeStr, "%02d:00", currentHour);
    fetchAndApplySettings(timeStr);
  } else if (needFetchHalfHourData) {
    // Format time as HH:30
    char timeStr[6];
    sprintf(timeStr, "%02d:30", currentHour);
    fetchAndApplySettings(timeStr);
  }
  
  // Save current time for next comparison
  lastHour = currentHour;
  lastMinute = currentMinute;
}

// Add this new function for initial data load
void fetchInitialDataBasedOnTime() {
  // Get current time
  if(!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time for initial data fetch");
    return;
  }
  
  int currentHour = timeinfo.tm_hour;
  int currentMinute = timeinfo.tm_min;
  
  // Format time string based on whether we're in first or second half hour
  char timeStr[6];
  if (currentMinute < 30) {
    sprintf(timeStr, "%02d:00", currentHour);
  } else {
    sprintf(timeStr, "%02d:30", currentHour);
  }
  
  Serial.println("Initial data fetch on boot...");
  
  // Fetch and apply settings
  fetchAndApplySettings(timeStr);
  
  // Set flags based on current time position
  lastHour = currentHour;
  lastMinute = currentMinute;
  hourDataFetched = (currentMinute < 30);      // Mark hour data as fetched if in first half
  halfHourDataFetched = (currentMinute >= 30); // Mark half-hour data as fetched if in second half
  
  Serial.println("Initial data fetch complete");
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
  connectNTPServers();

  // Beginning Supabase Connection
  db.begin(supabase_url, anon_key);

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
  // Initialize data immediately on boot
  fetchInitialDataBasedOnTime();

}

void loop() {
  // Check if the reset button is pressed
  resetCheckAndStartWiFiManager();

  // Check time and update settings periodically
  unsigned long currentMillis = millis();
  if (currentMillis - lastTimeCheck >= TIME_CHECK_INTERVAL) {
    lastTimeCheck = currentMillis;
    updateLightingBasedOnTime();
  }
  
  // Read sensor and apply control
  SensorData sensorReadings = readSensorValues();
  if (sensorReadings.isValid) {
    simpleControl(targetCCT, sensorReadings.colorTemp, targetLux, sensorReadings.lux);
  } else {
    Serial.println("Failed to read valid sensor data.");
  }
}
