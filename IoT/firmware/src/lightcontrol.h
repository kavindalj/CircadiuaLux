#pragma once

// Function declarations
void setupCCTPins();
void looplight();
void simpleControl(int targetCCT, int currentCCT, int targetLux, int currentLux);
void applyCCTAndBrightness(int cctValue, int brightnessValue);
void PIDControlLight(int setCCT, int currentCCT, int setBrightness, int currentBrightness, 
                    double Kp_cct, double Ki_cct, double Kd_cct,
                    double Kp_lux, double Ki_lux, double Kd_lux);