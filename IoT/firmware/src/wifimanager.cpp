#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>
#include <ArduinoJson.h>
#include "config.h"
#include "wifimanager.h"

#define EEPROM_SIZE 128
#define SSID_ADDR   0
#define PASS_ADDR   32
#define MAX_SSID_LEN 32
#define MAX_PASS_LEN 64

WiFiCredentials readWiFiCredentialsFromEEPROM() {
    WiFiCredentials wifiCredentials;
    EEPROM.begin(EEPROM_SIZE);
    char ssidBuf[MAX_SSID_LEN + 1];
    char passBuf[MAX_PASS_LEN + 1];
    for (int i = 0; i < MAX_SSID_LEN; ++i) {
        ssidBuf[i] = EEPROM.read(SSID_ADDR + i);
    }
    ssidBuf[MAX_SSID_LEN] = 0;
    for (int i = 0; i < MAX_PASS_LEN; ++i) {
        passBuf[i] = EEPROM.read(PASS_ADDR + i);
    }
    passBuf[MAX_PASS_LEN] = 0;
    wifiCredentials.ssid = String(ssidBuf);
    wifiCredentials.password = String(passBuf);
    EEPROM.end();
    return wifiCredentials;
}

void saveWiFiCredentialsToEEPROM(const String& ssid, const String& password) {
    EEPROM.begin(EEPROM_SIZE);
    // Write SSID
    for (int i = 0; i < MAX_SSID_LEN; ++i) {
        if (i < ssid.length()) {
            EEPROM.write(SSID_ADDR + i, ssid[i]);
        } else {
            EEPROM.write(SSID_ADDR + i, 0);
        }
    }
    // Write Password
    for (int i = 0; i < MAX_PASS_LEN; ++i) {
        if (i < password.length()) {
            EEPROM.write(PASS_ADDR + i, password[i]);
        } else {
            EEPROM.write(PASS_ADDR + i, 0);
        }
    }
    EEPROM.commit();
    EEPROM.end();
}

void resetCheckAndStartWiFiManager() {
    static unsigned long buttonPressStart = 0;
    static bool apStarted = false;

    if (digitalRead(RESET_BTN_PIN) == LOW) {
        if (buttonPressStart == 0) {
            buttonPressStart = millis(); // Button just pressed
        } else if (!apStarted && (millis() - buttonPressStart >= 3000)) {
            Serial.println("Reset button held for 3 seconds. Setting up Access Point...");
            startWiFiManager();
            apStarted = true; // Prevent retriggering
        }
    } else {
        buttonPressStart = 0;
        apStarted = false;
    }
}

void connectToWiFi(WiFiCredentials wifiCredentials) {
  // Clean up old connections and connect to new WiFi
  WiFi.disconnect();
  delay(100);
  WiFi.begin(wifiCredentials.ssid, wifiCredentials.password);
  Serial.println("Waiting for WiFi connection...");

  int statusStartWiFiManager = 0;

  while (WiFi.status() != WL_CONNECTED) {
    if (digitalRead(RESET_BTN_PIN) == HIGH && statusStartWiFiManager == 0) {
        Serial.print(".");
        digitalWrite(AP_LED_PIN, HIGH); // Blink LED when tring to connect to WiFi
        delay(500);
        digitalWrite(AP_LED_PIN, LOW);
        delay(500);
    } else {
        statusStartWiFiManager = 1;
        resetCheckAndStartWiFiManager();
    }
  }
  Serial.println("WiFi connected.");
  digitalWrite(AP_LED_PIN, LOW);
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void setupAP(){
  // Clean up old connections and change mode to AP
  Serial.println("Setting up Access Point...");
  WiFi.disconnect();
  WiFi.mode(WIFI_AP);
  delay(100);
  // Create Access Point
  WiFi.softAP("CircadiaLux-Setup", "");
  Serial.println("Access Point Started");
  digitalWrite(AP_LED_PIN, HIGH); // Turn on the AP LED to indicate AP mode
  Serial.print("IP Address: ");
  Serial.println(WiFi.softAPIP());
  // Start mDNS responder
  if (MDNS.begin("circadialux")) { // "circadialux.local"
    Serial.println("mDNS responder started: http://circadialux.local");
  } else {
    Serial.println("Error setting up mDNS responder!");
  }
}


char wifiwebpage[] PROGMEM = R"=====(

<!DOCTYPE html>
<html>
<head>
    <title>WiFi Config</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        .container {
            text-align: center;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        .form {
            display: inline-block;
            text-align: left;
            width: 100%;
            max-width: 400px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        input[type="text"],input[type="password"] {
            width: calc(100% - 16px);
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input[type="submit"] {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            font-size: 14px;
            cursor: pointer;
            display: block;
            width: 150px;
            margin: 0 auto;
            box-sizing: border-box;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        #or {
            margin-bottom: 15px;
            color: #a8a7a7;
            text-align: center;
        }
        /* Modal Styles */
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1; 
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto; 
            background-color: rgb(0,0,0); 
            background-color: rgba(0,0,0,0.4); 
            padding-top: 60px;
        }
        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
            text-align: center;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        .modal-button {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        .modal-button button {
            padding: 8px 24px;
            border: none;
            border-radius: 4px;
            background-color: #007bff;
            color: white;
            font-size: 14px;
            cursor: pointer;
            margin: 0 10px;
            transition: background 0.2s;
        }
        .modal-button button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<script>
    var connection = new WebSocket('ws://'+location.hostname+'/ws');
    
    var SSID, PASSWD;

    connection.onmessage = function(event) {
      var data = JSON.parse(event.data);
      if(data.device_id) {
        document.getElementById('device_id').innerText = data.device_id;
      }
    };

    function submit() {
        SSID = document.getElementById("ssid").value;
        PASSWD = document.getElementById("password").value;

        if (SSID && PASSWD) {
            showConfirmationModal();
        } else {
            // Handle the case where no input or incomplete input is provided
            alert('Please fill in the required fields.');
        }
    }

    function showConfirmationModal() {
        var modal = document.getElementById("confirmationModal");
        var ssidField = document.getElementById("modalSSID");

        ssidField.innerHTML = `<strong>WiFI SSID:</strong> ${SSID}`;

        modal.style.display = "block";

        document.getElementById("confirmButton").onclick = function() {
            send_data();
            showSuccessModal();
            modal.style.display = "none";
        };
        document.getElementById("cancelButton").onclick = function() {
            modal.style.display = "none";
        };
        document.querySelector(".close").onclick = function() {
            modal.style.display = "none";
        };
    }

    function showSuccessModal() {
        var successModal = document.getElementById("successModal");
        var successMessage = document.getElementById("successMessage");

        var message = `Please take a moment. This will reboot device and automatically connect to <strong>${SSID}</strong>`;

        successMessage.innerHTML = message;
        successModal.style.display = "block";

        setTimeout(function() {
            successModal.style.display = "none";
        }, 5000); // Hide the success modal after 5 seconds
    }

    function send_data() {
        var wifi_data = JSON.stringify({
            ssid: SSID,
            password: PASSWD
        });
        connection.send(wifi_data);
        console.log(wifi_data);
    }
</script>
<body>
    <div class="container">
        <h1>Enter Your WiFi Credentials</h1>
        <h3>Device ID: <span id="device_id"></span></h3>
        <div class="form">
            <div class="form-group">
                <label for="ssid">WiFi SSID</label>
                <input type="text" id="ssid" name="ssid" length=32 placeholder="Your_SSID">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" length=64 placeholder="********">
            </div>
            <input type="submit" value="Change" onclick="submit()">
        </div>
    </div>

    <!-- The Confirmation Modal -->
    <div id="confirmationModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Confirm Your Details</h2>
            <p id="modalSSID"></p>
            <div class="modal-button">
                <button id="confirmButton">Confirm</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </div>
    </div>

    <!-- The Success Modal -->
    <div id="successModal" class="modal">
        <div class="modal-content">
            <h2>Success!</h2>
            <p id="successMessage"></p>
        </div>
    </div>
</body>
</html>


)=====";



void notFound(AsyncWebServerRequest *request)
{
  request->send(404, "text/plain", "Page Not found");
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  String message = String((char *)data);
  Serial.println("Received message: " + message);

  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, message);

  if (!error) {
    String receivedSSID = doc["ssid"];
    String receivedPassword = doc["password"];

    Serial.println("Received WiFi credentials:");
    Serial.println("SSID: " + receivedSSID);
    Serial.println("Password: " + receivedPassword);

    // Save to flash memory and reboot device
    saveWiFiCredentialsToEEPROM(receivedSSID, receivedPassword);
    Serial.println("Rebooting ESP32...");
    delay(1000);
    ESP.restart();
  }
}

void handleWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("WebSocket client connected");
    // Send device_id to client
    JsonDocument doc;
    doc["device_id"] = device_id;
    String msg;
    serializeJson(doc, msg);
    client->text(msg);
  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("WebSocket client disconnected");
  } else if (type == WS_EVT_DATA) {
    handleWebSocketMessage(arg, data, len);
  }
}

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

void startWiFiManager() {
  //Start Access Point
  setupAP();

  // Initialize WebSocket
  ws.onEvent(handleWebSocketEvent);
  server.addHandler(&ws);

  // Serve the HTML page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", wifiwebpage);
  });
  
  server.onNotFound(notFound);

  // Start server
  server.begin();
  Serial.println("HTTP server started");
}

