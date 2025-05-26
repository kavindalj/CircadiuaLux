#pragma once
#include <Arduino.h>

// Structure to hold WiFi credentials
struct WiFiCredentials {
  String ssid;      // WiFi SSID
  String password; // WiFi Password
};

WiFiCredentials readWiFiCredentialsFromEEPROM();
void connectToWiFi(WiFiCredentials wifiCredentials);
void startWiFiManager();