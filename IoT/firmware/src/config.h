#pragma once

//Device ID
extern String device_id;

// Sensor LED
extern const int SENSOR_LED_PIN;

// Reset Button Pin
extern const int RESET_BTN_PIN;
// Access Point mode led pin
extern const int AP_LED_PIN;

// LED Strip Pins
extern const int WW_PIN;
extern const int CW_PIN;

// Supabase
extern String supabase_url;
extern String anon_key;

// NTP server settings
extern const char* ntpServer;
extern const long gmtOffset_sec;
extern const int daylightOffset_sec;