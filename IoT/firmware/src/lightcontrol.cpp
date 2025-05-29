#include <Arduino.h>
#include "config.h"
#include "lightcontrol.h"

void setupCCTPins() {
  pinMode(WW_PIN, OUTPUT);
  pinMode(CW_PIN, OUTPUT);
}

void looplight() {
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(WW_PIN, brightness);
    analogWrite(CW_PIN, 255 - brightness);
    delay(5);
  }
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(WW_PIN, brightness);
    analogWrite(CW_PIN, 255 - brightness);
    delay(5);
  }
}

void applyCCTAndBrightness(int cctValue, int brightnessValue) {
  // cctValue (0-255): 0 = warmest, 255 = coolest
  // brightnessValue (0-255): 0 = off, 255 = maximum brightness
  
  // Constrain inputs to valid PWM ranges
  cctValue = constrain(cctValue, 0, 255);
  brightnessValue = constrain(brightnessValue, 0, 255);
  
  int warmValue, coolValue;

  // Determine the ratio between warm and cool for CCT
  warmValue = map(cctValue, 0, 255, 255, 0);  // Inverse mapping
  coolValue = map(cctValue, 0, 255, 0, 255);  // Direct mapping
  
  // Scale both channels by brightness while maintaining ratio
  // warmValue = (warmValue * brightnessValue) / 255;
  // coolValue = (coolValue * brightnessValue) / 255;
  
  // Apply to the PWM pins
  analogWrite(WW_PIN, warmValue);
  analogWrite(CW_PIN, coolValue);

  // Serial.print("CCT: "); Serial.print(cctValue);
  // Serial.print(" | Brightness: "); Serial.print(brightnessValue);
//   Serial.print(" | WW: "); Serial.print(warmValue);
//   Serial.print(" | CW: "); Serial.println(coolValue);
}

void PIDControlLight(int setCCT, int currentCCT, int setBrightness, int currentBrightness, 
                    double Kp_cct, double Ki_cct, double Kd_cct,
                    double Kp_lux, double Ki_lux, double Kd_lux) {
  
  static double integral_cct = 0.0;
  static double last_error_cct = 0.0;
  static double integral_lux = 0.0;
  static double last_error_lux = 0.0;
  static unsigned long lastTime = 0;
  
  // Calculate time elapsed since last execution (in seconds)
  unsigned long now = millis();
  double dt = (now - lastTime) / 1000.0; // Convert ms to seconds
  
  // First call or very long delay, skip integral/derivative
  if (lastTime == 0 || dt > 1.0) {
    lastTime = now;
    last_error_cct = setCCT - currentCCT;
    last_error_lux = setBrightness - currentBrightness;
    return;
  }
  
  lastTime = now;
  
  // Calculate current errors
  double error_cct = setCCT - currentCCT;
  double error_lux = setBrightness - currentBrightness;
  
  // Integrate error over time
  integral_cct += error_cct * dt;
  integral_lux += error_lux * dt;
  
  // Calculate derivative (rate of change)
  double derivative_cct = (error_cct - last_error_cct) / dt;
  double derivative_lux = (error_lux - last_error_lux) / dt;
  
  // Save current errors for next iteration
  last_error_cct = error_cct;
  last_error_lux = error_lux;
  
  // Calculate PID outputs
  int output_cct = Kp_cct * error_cct + Ki_cct * integral_cct + Kd_cct * derivative_cct;
  int output_lux = Kp_lux * error_lux + Ki_lux * integral_lux + Kd_lux * derivative_lux;
  
  // Constrain outputs to valid PWM range
  // output_cct = constrain(output_cct, 0, 255);
  // output_lux = constrain(output_lux, 0, 255);
  
  // Apply both CCT and brightness together
  applyCCTAndBrightness(output_cct, output_lux);

  Serial.print(">Target:"); Serial.println(setCCT);
  Serial.print(">Current:"); Serial.println(currentCCT);
  
  // Debug output
  // Serial.print("dt: "); Serial.print(dt, 4);
  // Serial.print("CCT Output: "); Serial.println(output_cct);
  // Serial.print(" | Brightness Output: "); Serial.println(output_lux);
}

void simpleControl(int targetCCT, int currentCCT) {
    // Static variables to remember previous state
    static int lastOutputValue = 127;  // Middle point (neutral)
    static unsigned long lastChangeTime = 0;
    // Calculate error
    int error = targetCCT - currentCCT;
    // Only make adjustments at reasonable intervals
    unsigned long now = millis();
    if (now - lastChangeTime < 200) {
        return;
    }
    // Determine adjustment amount based on error size
    int adjustmentAmount;
    if (abs(error) > 1000) {
        adjustmentAmount = 10;
    } else if (abs(error) > 500) {
        adjustmentAmount = 5;
    } else if (abs(error) > 200) {
        adjustmentAmount = 2;
    } else {
        adjustmentAmount = 1;
    }
    // Direction of adjustment
    int newOutputValue;
    if (error > 0) {
        // Need to increase CCT (more cool)
        newOutputValue = lastOutputValue + adjustmentAmount;
    } else if (error < 0) {
        // Need to decrease CCT (more warm)
        newOutputValue = lastOutputValue - adjustmentAmount;
    } else {
        newOutputValue = lastOutputValue;
    }
    // Constrain to valid range
    newOutputValue = constrain(newOutputValue, 0, 255);
    // Only record time if we actually changed the output
    if (newOutputValue != lastOutputValue) {
        lastChangeTime = now;
        lastOutputValue = newOutputValue;
    }
    // Apply output
    applyCCTAndBrightness(newOutputValue, 200);
    Serial.print(">Target:"); Serial.println(targetCCT);
    Serial.print(">Current:"); Serial.println(currentCCT);
}