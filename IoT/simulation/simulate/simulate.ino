void setup() {
  pinMode(5, OUTPUT);  // Simulate Cool White
  pinMode(6, OUTPUT);  // Simulate Warm White
}

void loop() {
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(5, brightness);
    analogWrite(6, 255 - brightness);
    delay(5);
  }
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(5, brightness);
    analogWrite(6, 255 - brightness);
    delay(5);
  }
}


