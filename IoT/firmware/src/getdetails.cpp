#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESPSupabase.h>

#include "config.h"

Supabase db;

void getDataFromSupabase()
{
  String device_id = "D1019" ;
  String time;
  JsonDocument doc;

  // Get room id
  String read = db.from("devices").select("room_no").eq("device_id", device_id).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  const char* room_no = doc[0]["room_no"];

  Serial.println(room_no);

  // Get patient id, status, disease
  read = db.from("patients").select("id,patient_status,disease").eq("room_no", room_no).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  const int patient_id = doc[0]["id"];
  const char* patient_status = doc[0]["patient_status"];
  const char* disease = doc[0]["disease"];

  Serial.println(patient_id);
  Serial.println(patient_status);
  Serial.println(disease);

  // Get sleep time
  read = db.from("diseases").select("sleep_time").eq("disease_id", disease).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  const char* sleep_time = doc[0]["sleep_time"];

  Serial.println(sleep_time);
}