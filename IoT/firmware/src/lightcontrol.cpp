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
  warmValue = (warmValue * brightnessValue) / 255;
  coolValue = (coolValue * brightnessValue) / 255;
  
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

void simpleControl(int targetCCT, int currentCCT, int targetLux, int currentLux) {
    // Static variables for CCT control
    static int lastCCTValue = 127;  // Middle point for CCT
    static unsigned long lastCCTChangeTime = 0;
    
    // Static variables for Lux control
    static int lastLuxValue = 200;  // Middle brightness
    static unsigned long lastLuxChangeTime = 0;
    
    unsigned long now = millis();
    
    // PART 1: CCT CONTROL
    // Calculate CCT error
    int cctError = targetCCT - currentCCT;
    
    // Only adjust CCT at reasonable intervals
    if (now - lastCCTChangeTime >= 200) {
        // Determine CCT adjustment amount based on error size
        int cctAdjustment;
        if (abs(cctError) > 1000) {
            cctAdjustment = 10;
        } else if (abs(cctError) > 500) {
            cctAdjustment = 5;
        } else if (abs(cctError) > 200) {
            cctAdjustment = 2;
        } else {
            cctAdjustment = 1;
        }
        
        // Calculate new CCT value
        int newCCTValue;
        if (cctError > 0) {
            // Need to increase CCT (more cool)
            newCCTValue = lastCCTValue + cctAdjustment;
        } else if (cctError < 0) {
            // Need to decrease CCT (more warm)
            newCCTValue = lastCCTValue - cctAdjustment;
        } else {
            newCCTValue = lastCCTValue;
        }
        
        // Constrain to valid range
        newCCTValue = constrain(newCCTValue, 0, 255);
        
        // Only update if value changed
        if (newCCTValue != lastCCTValue) {
            lastCCTChangeTime = now;
            lastCCTValue = newCCTValue;
        }
    }
    
    // PART 2: LUX CONTROL
    // Calculate Lux error
    int luxError = targetLux - currentLux;
    
    // Only adjust Lux at reasonable intervals
    if (now - lastLuxChangeTime >= 300) { // Slightly slower than CCT updates
        // Determine Lux adjustment amount based on error size
        int luxAdjustment;
        if (abs(luxError) > 200) {
            luxAdjustment = 10;
        } else if (abs(luxError) > 100) {
            luxAdjustment = 5;
        } else if (abs(luxError) > 50) {
            luxAdjustment = 3;
        } else {
            luxAdjustment = 1;
        }
        
        // Calculate new Lux value
        int newLuxValue;
        if (luxError > 0) {
            // Need to increase brightness
            newLuxValue = lastLuxValue + luxAdjustment;
        } else if (luxError < 0) {
            // Need to decrease brightness
            newLuxValue = lastLuxValue - luxAdjustment;
        } else {
            newLuxValue = lastLuxValue;
        }
        
        // Constrain to valid range
        newLuxValue = constrain(newLuxValue, 20, 255); // Min brightness of 20 to prevent turning off
        
        // Only update if value changed
        if (newLuxValue != lastLuxValue) {
            lastLuxChangeTime = now;
            lastLuxValue = newLuxValue;
        }
    }
    
    // Apply both CCT and brightness together
    applyCCTAndBrightness(lastCCTValue, lastLuxValue);
    
    // Debug output
    Serial.print(">CCT Target:"); Serial.println(targetCCT);
    Serial.print(">CCT Current:"); Serial.println(currentCCT);
    Serial.print(">Lux Target:"); Serial.println(targetLux);
    Serial.print(">Lux Current:"); Serial.println(currentLux);
}