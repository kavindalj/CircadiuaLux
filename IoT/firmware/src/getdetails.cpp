#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESPSupabase.h>
#include <time.h>
#include "getdetails.h"
#include "config.h"

Supabase db;
SupabaseData data;

SupabaseData getDataFromSupabase(String device_id, String time)
{
  // Temporary storage for parsed JSON data received from Supabase HTTP responses
  JsonDocument doc;

  // Serial.println(device_id);
  // Serial.println(time);

  // Get room id
  String read = db.from("devices").select("room_no").eq("device_id", device_id).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  String room_no = doc[0]["room_no"];

  // Serial.println(room_no);

  // Get patient id, status, disease
  read = db.from("patients").select("id,patient_status,disease").eq("room_no", room_no).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  int patient_id = doc[0]["id"];
  data.patient_status = doc[0]["patient_status"].as<String>();;
  String disease = doc[0]["disease"];

  // Serial.println(patient_id);
  // Serial.println(patient_status);
  // Serial.println(disease);

  // Get sleep time
  read = db.from("diseases").select("sleep_time").eq("disease_id", disease).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  data.sleep_time = doc[0]["sleep_time"].as<String>();

  // Serial.println(sleep_time);

  //Get time related lighting
  read = db.from("lighting_predictions").select("patient_id,time,PhotopicLux,CCT_estimated").eq("patient_id", String(patient_id)).eq("time",time).doSelect();
  db.urlQuery_reset();
  Serial.println(read);

  deserializeJson(doc, read);

  data.PhotopicLux = doc[0]["PhotopicLux"];
  data.CCT_estimated = doc[0]["CCT_estimated"];

  // Serial.println(PhotopicLux);
  // Serial.println(CCT_estimated);

  // Serial.println(time);
  // Serial.println(device_id);
  // Serial.println(room_no);
  // Serial.println(patient_id);
  // Serial.println(disease);
  // Serial.println(data.patient_status);
  // Serial.println(data.sleep_time);
  // Serial.println(data.PhotopicLux);
  // Serial.println(data.CCT_estimated);
  return data;
}